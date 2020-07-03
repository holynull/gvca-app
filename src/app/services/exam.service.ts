import { Injectable } from '@angular/core';
import { TestPaper } from 'app/model/test-paper';
import { ApiService } from './api.service';
import { Question } from 'app/model/question';
import { QuestionOption } from 'app/model/que-option';
import { Storage } from '@ionic/storage';
import { ConstVal } from 'app/constVal';

@Injectable({
    providedIn: 'root'
})
export class ExamService {
    stateData = {
        rightStr: '',
        leftStr: ' / ',
        middleStr: '',
    }
    /**
       * 是否可以答题
       */
    enabled: boolean = true;

    testPapers: Array<TestPaper> = new Array();

    constructor(
        private api: ApiService,
        private storage: Storage,
    ) {

    }

    async loadData() {
        let res1 = await this.api.getExamList('3').toPromise();
        if (res1.code === 1) {
            this.testPapers.splice(0, this.testPapers.length);
            this.enabled = true;
            res1.info.forEach(async e => {
                let simulation = new TestPaper();
                simulation.gradeId = Number(e.gradeId);
                simulation.majorId = Number(e.majorId);
                simulation.addTime = new Date(e.addTime);
                simulation.examName = e.examName;
                simulation.sumScore = Number(e.sumScore);
                simulation.updateTime = new Date(e.updateTime);
                simulation.sort = Number(e.sort);
                simulation.semesterId = Number(e.semesterId);
                simulation.examTemplateId = Number(e.examTemplateId);
                simulation.examId = Number(e.examId);
                simulation.questionCategoryId = Number(e.questionCategoryId);
                simulation.startTime = new Date(e.startTime);
                simulation.endTime = new Date(e.Date);
                simulation.usedState = Number(e.usedState);
                simulation.status = Number(e.status);
                this.testPapers.push(simulation);
                let res3 = await this.api.getExamQuestionList(String(simulation.examId)).toPromise();
                if (res3.code === 1) {
                    res3.info.forEach((e3, qIndex, arr) => {
                        let que = new Question();
                        que.trueAnswer = e3.trueAnswer;
                        que.questionId = Number(e3.questionId);
                        que.question = e3.question;
                        que.addTime = new Date(e3.addTime);
                        que.questionCategoryId = Number(e3.questionCategoryId);
                        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        e3.optional.forEach(op => {
                            for (let i = 0; i < str.length; i++) {
                                if (op[str[i]]) {
                                    let option = new QuestionOption(str[i], op[str[i]]);
                                    que.optional.push(option);
                                    break;
                                }
                            }
                        });
                        que.updateTime = new Date(e3.updateTime);
                        que.studentAnswer = e3.studentAnswer;
                        que.explains = e3.explains;
                        que.questionType = e3.questionType;
                        que.questionStatus = Number(e3.questionStatus);
                        que.sort = qIndex + 1;
                        que.score = Number(e3.score);
                        simulation.questions.push(que);
                    });
                    await this.saveOrUpdate(true);
                } else {
                    console.error('获取模拟题库题目出错', res3);
                }
            });
        } else if (res1.code === 2) {
            this.enabled = false;
        } else {
            console.error('获取模拟试题库出错', res1);
        }
    }

    public getQuestionsById(examId: number): Array<Question> {
        for (let i = 0; i < this.testPapers.length; i++) {
            if (this.testPapers[i].examId === Number(examId)) {
                return this.testPapers[i].questions;
            }
        }
        return new Array();
    }

    public async saveOrUpdate(isUpdate: boolean) {
        let data = await this.storage.get(ConstVal.EXAM_DATA);
        if (isUpdate && data && this.testPapers) {
            data.forEach(d => {
                for (let i = 0; i < this.testPapers.length; i++) {
                    if (this.testPapers[i].examId === Number(d.examId)) {
                        d.questions.forEach(q => {
                            for (let n = 0; n < this.testPapers[i].questions.length; n++) {
                                if (this.testPapers[i].questions[n].questionId === Number(q.questionId)) {
                                    this.testPapers[i].questions[n].studentAnswer = q.studentAnswer;
                                    this.testPapers[i].questions[n].questionStatus = Number(q.questionStatus);
                                    this.testPapers[i].questions[n].score = Number(q.score);
                                    break;
                                }
                            }
                        });
                        break;
                    }
                }
            });
        }
        this.storage.set(ConstVal.EXAM_DATA, this.testPapers);
    }

    submit(examId: number): Promise<any> {
        let questions = this.getQuestionsById(examId);
        let json = new Array();
        questions.forEach(e => {
            let o = {
                questionId: e.questionId,
                studentAnswer: e.studentAnswer,
                state: e.getState(),
                score: e.getQuestionScore()
            }
            json.push(o);
        });
        return this.api.insertStuQuestion(JSON.stringify(json), String(examId)).toPromise().then(res => {
            if (res.code === 1) {
                this.loadData().then();
            } else {
                console.error('提交考试试卷出错', res);
            }
        });

    }
    getStateData(): Promise<boolean> {
        return this.api.getExamStatistical('3').toPromise().then(res => {
            if (res.code === 1) {
                this.stateData.leftStr = res.leftStr;
                this.stateData.rightStr = res.rightStr;
                this.stateData.middleStr = res.middleStr;
                return true;
            } else {
                console.error('获取考试统计数据出错', res);
                return false;
            }
        });
    }
}
