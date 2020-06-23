import { Injectable } from '@angular/core';
import { TestPaper } from 'app/model/test-paper';
import { ApiService } from './api.service';
import { Question } from 'app/model/question';
import { QuestionOption } from 'app/model/que-option';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  /**
     * 是否可以答题
     */
    enabled: boolean = true;

    testPapers: Array<TestPaper> = new Array();

    constructor(
        private api: ApiService,
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
                    res3.info.forEach(e3 => {
                        let que = new Question();
                        que.trueAnswer = e3.trueAnswer;
                        que.questionId = e3.questionId;
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
                        simulation.questions.push(que);
                    });
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

    public getQuesionsById(examId: number): Array<Question> {
        for (let i = 0; i < this.testPapers.length; i++) {
            if (this.testPapers[i].examId === examId) {
                return this.testPapers[i].questions;
            }
        }
        return new Array();
    }
}
