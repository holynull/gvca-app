import { Injectable } from '@angular/core';
import { Homework } from 'app/model/homework';
import { PageInfo } from 'app/model/pageInfo';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class HomeworkService {

    homeworks: Array<Homework> = new Array();

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
}
