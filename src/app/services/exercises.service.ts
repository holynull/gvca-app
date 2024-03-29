import { Injectable } from '@angular/core';
import { ExercisCourse } from 'app/model/exercis-course';
import { ExercisCourseDetail } from 'app/model/exercis-course-detail';
import { QuestionOption } from 'app/model/que-option';
import { Question } from '../model/question';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
import { ConstVal } from 'app/constVal';
import { retry } from 'rxjs/operators';
import { SimulationService } from './simulation.service';

@Injectable({
    providedIn: 'root'
})
export class ExercisesService {

    exercisCourses: Array<ExercisCourse> = new Array();

    stateData = {
        rightStr: '',
        leftStr: ' / ',
        middleStr: '',
    }

    constructor(
        private api: ApiService,
        private storage: Storage,
        private simuSvr:SimulationService,
    ) { }

    public async loadData() {
        let res1 = await this.api.getEaxmCourseList().toPromise();
        if (res1.code === 1) {
            this.exercisCourses.splice(0, this.exercisCourses.length);
            res1.info.forEach(async (e, cIndex, arr) => {
                let course: ExercisCourse = new ExercisCourse();
                course.dateline = e.deateline;
                course.name = e.name;
                course.questionUsedSum = Number(e.questionUsedSum ? e.questionUsedSum : 0);
                course.qcid = Number(e.qcid);
                course.pid = Number(e.pid);
                course.questionSum = Number(e.questionSum ? e.questionSum : 0);
                course.status = Number(e.status);
                if (cIndex === 0) {
                    course.openState = "open";
                }
                this.exercisCourses.push(course);
                let res2 = await this.api.getEaxmCourseDetailList(String(course.qcid)).toPromise();
                if (res2.code === 1) {
                    res2.info.forEach(async e1 => {
                        let detail = new ExercisCourseDetail();
                        detail.dateline = Number(e1.dateline);
                        detail.name = e1.name;
                        detail.questionUsedSum = Number(e1.questionUsedSum ? e1.questionUsedSum : 0);
                        detail.qcid = Number(e1.qcid);
                        detail.pid = Number(e1.pid);
                        detail.questionSum = Number(e1.questionSum ? e1.questionSum : 0);
                        detail.status = Number(e1.status);
                        course.details.push(detail);
                        let res3 = await this.api.getQuestionList(String(detail.qcid)).toPromise();
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
                                detail.questions.push(que);
                            });
                            await this.saveOrUpdate(true);
                        } else {
                            console.error('获取练习题目出错', res3);
                        }
                    });
                } else {
                    console.error('获取知识点出错', res2);
                }
            });
        } else {
            console.error('获取练习题库出错', res1);
        }
    }

    getQuestions(pid: number, qcid: number): Array<Question> {
        for (let i = 0; i < this.exercisCourses.length; i++) {
            if (this.exercisCourses[i].qcid === Number(pid)) {
                let detail = this.exercisCourses[i].getDetailById(qcid);
                if (detail) {
                    return detail.questions;
                }
            }
        }
        return new Array();
    }

    /**
     * api数据拉取完成后，从本地存储更新数据
     */
    public async saveOrUpdate(isUpdate: boolean) { // api数据拉取完成后，从本地存储更新数据
        let data = await this.storage.get(ConstVal.EXER_DATA);
        if (isUpdate && data && this.exercisCourses.length > 0) { // update
            data.forEach(e => {
                for (let i = 0; i < this.exercisCourses.length; i++) {
                    if (this.exercisCourses[i].pid === Number(e.pid)) {
                        e.details.forEach(d => {
                            for (let j = 0; j < this.exercisCourses[i].details.length; j++) {
                                if (this.exercisCourses[i].details[j].qcid === Number(d.qcid)) {
                                    d.questions.forEach(q => {
                                        for (let n = 0; n < this.exercisCourses[i].details[j].questions.length; n++) {
                                            if (this.exercisCourses[i].details[j].questions[n].questionId === Number(q.questionId)) {
                                                this.exercisCourses[i].details[j].questions[n].studentAnswer = q.studentAnswer;
                                                this.exercisCourses[i].details[j].questions[n].questionStatus = Number(q.questionStatus);
                                                this.exercisCourses[i].details[j].questions[n].score = Number(q.score);
                                                break;
                                            }
                                        }
                                    });
                                    break;
                                }
                            }
                        });
                        break;
                    }
                }
            });
        }
        this.storage.set(ConstVal.EXER_DATA, this.exercisCourses);
    }

    submit(pid: number, qcid: number): Promise<any> {
        let questions = this.getQuestions(pid, qcid);
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
        return this.api.insertStuLxQuestion(JSON.stringify(json), String(pid), String(qcid)).toPromise().then(res => {
            if (res.code === 1) {
                this.loadData().then();
                this.simuSvr.loadData().then();
            } else {
                console.error('提交练习试卷出错', res);
            }
        });
    }

    getStateData(): Promise<boolean> {
        return this.api.getExamStatistical('1').toPromise().then(res => {
            if (res.code === 1) {
                this.stateData.leftStr = res.leftStr;
                this.stateData.rightStr = res.rightStr;
                this.stateData.middleStr = res.middleStr;
                return true;
            } else {
                console.error('获取练习题统计数据出错', res);
                return false;
            }
        });
    }
}
