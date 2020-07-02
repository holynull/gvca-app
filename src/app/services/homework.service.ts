import { Injectable } from '@angular/core';
import { Homework } from 'app/model/homework';
import { PageInfo } from 'app/model/pageInfo';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class HomeworkService {

    homeworks: Array<Homework> = new Array();

    completed: Array<Homework> = new Array();

    constructor(
        private api: ApiService,
    ) {

    }

    getHomeWorks(pageInfo: PageInfo, callBack?: () => any) {
        this.api.getHomeWorkList(pageInfo.curPageNum, pageInfo.pageSize).subscribe(res => {
            if (res.code === 1) {
                if (pageInfo.curPageNum === 1) {
                    this.homeworks.splice(0, this.homeworks.length);
                }
                res.info.forEach(e => {
                    let hw = new Homework();
                    hw.dataUrl = e.dataUrl;
                    hw.departmentName = e.departmentName;
                    hw.majorId = e.majorId;
                    hw.addTime = new Date(e.addTime);
                    hw.teacherName = e.teacherName;
                    hw.homeworkDetail = e.homeworkDetail;
                    hw.departmentId = e.departmentId;
                    hw.homeworkStatus = e.homeworkStatus;
                    hw.semesterName = e.semesterName;
                    hw.updateTime = new Date(e.updateTime);
                    hw.sort = e.sort;
                    hw.workTime = new Date(e.workTime);
                    hw.stuhomeworkStatus = e.stuhomeworkStatus;
                    hw.homeworkName = e.homeworkName;
                    hw.semesterId = e.semesterId;
                    hw.score = e.score;
                    hw.homeworkId = e.homeworkId;
                    hw.teacherId = e.teacherId;
                    hw.workTimeStr = e.workTimeStr;
                    hw.schoolId = e.schoolId;
                    hw.majorName = e.majorName;
                    hw.stuAnsPhoto = e.stuAnsPhoto;
                    this.homeworks.push(hw);
                });
            } else {
                console.error(res, {});
            }
            if (callBack) {
                callBack();
            }
        });
    }

    loadCompletedHomeWork(): Promise<boolean> {
        return this.api.getStuHomeWorkList().toPromise().then(res => {
            if (res.code === 1) {
                this.completed.splice(0, this.completed.length);
                res.info.forEach(e => {
                    let hw = new Homework();
                    hw.dataUrl = e.dataUrl;
                    hw.departmentName = e.departmentName;
                    hw.majorId = e.majorId;
                    hw.addTime = new Date(e.addTime);
                    hw.teacherName = e.teacherName;
                    hw.homeworkDetail = e.homeworkDetail;
                    hw.departmentId = e.departmentId;
                    hw.homeworkStatus = e.homeworkStatus;
                    hw.semesterName = e.semesterName;
                    hw.updateTime = new Date(e.updateTime);
                    hw.sort = e.sort;
                    hw.workTime = new Date(e.workTime);
                    hw.stuhomeworkStatus = e.stuhomeworkStatus;
                    hw.homeworkName = e.homeworkName;
                    hw.semesterId = e.semesterId;
                    hw.score = e.score;
                    hw.homeworkId = e.homeworkId;
                    hw.teacherId = e.teacherId;
                    hw.workTimeStr = e.workTimeStr;
                    hw.schoolId = e.schoolId;
                    hw.majorName = e.majorName;
                    hw.stuAnsPhoto = e.stuAnsPhoto;
                    this.completed.push(hw);
                });
                return true;
            } else {
                return false;
                console.error('获取用户已完成作业失败', res);
            }
        });
    }

    getHomeworkById(hId: number): Homework {
        for (let i = 0; i < this.homeworks.length; i++) {
            if (this.homeworks[i].homeworkId === hId) {
                return this.homeworks[i];
            }
        }
        return null;
    }

    submit(hw: Homework, path: string, txtAnswer: string): Promise<boolean> {
        return this.api.insertStuHome(String(hw.homeworkId), String(hw.teacherId), path, txtAnswer).toPromise().then(res => {
            if (res.code === 1) {
                this.getHomeWorks(new PageInfo());
                this.loadCompleted();
                return true;
            } else {
                console.error('提交作业出错', res);
                return false;
            }
        });
    }
}
