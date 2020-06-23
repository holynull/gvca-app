import { Injectable } from '@angular/core';
import { ExercisCourse } from 'app/model/exercis-course';
import { ExercisCourseDetail } from 'app/model/exercis-course-detail';
import { QuestionOption } from 'app/model/que-option';
import { Question } from '../model/question';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ExercisesService {

    exercisCourses: Array<ExercisCourse> = new Array();

    constructor(
        private api: ApiService,
    ) { }

    public async loadData() {
        let res1 = await this.api.getEaxmCourseList().toPromise();
        if (res1.code === 1) {
            this.exercisCourses.splice(0, this.exercisCourses.length);
            res1.info.forEach(async e => {
                let course: ExercisCourse = new ExercisCourse();
                course.dateline = e.deateline;
                course.name = e.name;
                course.questionUsedSum = Number(e.questionUsedSum);
                course.qcid = Number(e.qcid);
                course.pid = Number(e.pid);
                course.questionSum = Number(e.questionSum);
                course.status = Number(e.status);
                this.exercisCourses.push(course);
                let res2 = await this.api.getEaxmCourseDetailList(String(course.pid)).toPromise();
                if (res2.code === 1) {
                    res2.info.forEach(async e1 => {
                        let detail = new ExercisCourseDetail();
                        detail.dateline = Number(e1.dateline);
                        detail.name = e1.name;
                        detail.questionUsedSum = Number(e1.questionUsedSum);
                        detail.qcid = Number(e1.qcid);
                        detail.pid = Number(e1.pid);
                        detail.questionSum = Number(e.questionSum);
                        detail.status = Number(e.status);
                        course.details.push(detail);
                        let res3 = await this.api.getQuestionList(String(detail.qcid)).toPromise();
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
                                detail.questions.push(que);
                            });
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
            if (this.exercisCourses[i].pid === pid) {
                let detail = this.exercisCourses[i].getDetailById(qcid);
                if (detail) {
                    return detail.questions;
                }
            }
        }
        return new Array();
    }
}
