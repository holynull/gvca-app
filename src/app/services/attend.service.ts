import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { ApiService } from './api.service';
import { SignRecord } from 'app/model/sign-record';
import { SignStatus } from 'app/model/sign-status.enum';
import { Company } from 'app/model/company';
import { DatePipe } from '@angular/common';
import { HolidayState } from 'app/model/holiday-state.enum';
import { SignType } from 'app/model/sign-type.enum';

@Injectable({
    providedIn: 'root'
})
export class AttendService {

    records: Array<SignRecord> = new Array();

    company: Company;

    constructor(
        private api: ApiService,
        @Inject(LOCALE_ID) private locale: string,
    ) {

    }

    loadData(): Promise<boolean> {
        let p1 = this.api.getSignCompany().toPromise().then(res => {
            if (res.code === 1) {
                this.company = new Company();
                this.company.signStartTime = res.signStartTime;
                this.company.distance = Number(res.distance);
                this.company.addTime = new Date(res.addTime);
                this.company.companyDesc = res.companyDesc;
                this.company.companyName = res.companyName;
                this.company.latitude = Number(res.latitude);
                this.company.companyStatus = Number(res.companyStatus);
                this.company.updateTime = new Date(res.updateTime);
                this.company.companyId = Number(res.companyId);
                this.company.companyAddress = res.companyAddress;
                this.company.signEndTime = res.signEndTime;
                this.company.longitude = Number(res.longitude);
                return true;
            } else {
                console.error('获取用户签到公司数据出错', res);
                return false;
            }
        });
        let year = new Date().getFullYear();
        let p2 = this.api.getSignList(String(year)).toPromise().then(res => {
            if (res.code === 1) {
                res.info.forEach(e => {
                    let record = new SignRecord();
                    record.gradeId = Number(e.gradeId);
                    record.signAddress = e.signAddress;
                    record.majorId = Number(e.majorId);
                    record.addTime = new Date(e.addTime);
                    record.departmentId = Number(e.departmentId);
                    record.latitude = Number(e.latitude);
                    record.signStatus = Number(e.signStatus);
                    record.exemptState = Number(e.exemptState);
                    record.updateTime = new Date(e.updateTime);
                    record.signDate = new Date(e.signDate);
                    record.timedate = String(e.timedate);
                    record.holidayState = Number(e.holidayState);
                    record.recordId = Number(e.recordId);
                    record.studentId = Number(e.studentId);
                    record.classId = Number(e.classId);
                    record.schoolId = Number(e.schoolId);
                    record.company = Number(e.company);
                    record.longitude = Number(e.longitude);
                    this.records.push(record);
                });
                return true;
            } else {
                console.error('获取用户签到记录出错', res);
                return false;
            }
        });
        let pArr = [p1, p2];
       return Promise.all(pArr).then(res => {
            return res[0] && res[1];
        });
    }

    signStatus(d: Date): SignStatus {
        let datePipe = new DatePipe(this.locale);
        let str = datePipe.transform(d, 'yyyyMMdd');
        for (let i = 0; i < this.records.length; i++) {
            if (str === this.records[i].timedate) {
                return this.records[i].signStatus;
            }
        }
        return SignStatus.NONE;
    }

    getRecord(d: Date): SignRecord {
        let datePipe = new DatePipe(this.locale);
        let str = datePipe.transform(d, 'yyyyMMdd');
        for (let i = 0; i < this.records.length; i++) {
            if (this.records[i].timedate === str) {
                return this.records[i];
            }
        }
        return null;
    }

    transSignStatus(status: SignStatus): string {
        switch (status) {
            case 0:
                return '未签到';
            case 1:
                return '已签到';
            case 2:
                return '签到地址错误';
            case 3:
                return '签到时间有误';
            case 4:
                return '签到地址和时间均有误';
            case 5:
                return '请假';
            case 6:
                return '未签到申请豁免';
        }
    }

    applyExempt(date: Date): Promise<boolean> {
        let datePipe = new DatePipe(this.locale);
        let str = datePipe.transform(date, 'yyyyMMdd');
        return this.api.updateExemptState(str).toPromise().then(res => {
            if (res.code === 1) {
                this.loadData();
                return true;
            } else {
                return false;
            }
        });
    }

    askLeave(type: HolidayState): Promise<boolean> {
        return this.api.updateHolidayState(type).toPromise().then(res => {
            if (res.code === 1) {
                this.loadData();
                return true;
            } else {
                console.error('请假失败', res);
                return false;
            }
        });
    }

    sign(lng: number, lat: number, distance: number): Promise<boolean> {
        let now = new Date();
        let dWrong: boolean = distance > 500; // 距离大于500米
        let sta = new Date().setHours(Number(this.company.signStartTime.split(':')[0]), Number(this.company.signStartTime.split(':')[1]), 0, 0);
        let end = new Date().setHours(Number(this.company.signEndTime.split(':')[0]), Number(this.company.signEndTime.split(':')[1]), 0, 0);
        let tWrong = false;
        if (now.getTime() > end || now.getTime() < sta) {
            tWrong = true;
        }
        let status: SignType = SignType.NONE;
        if (dWrong && tWrong) {
            status = SignType.ADDRESS_TIME_WRONG;
        } else if (dWrong) {
            status = SignType.ADDRESS_WRONG;
        } else if (tWrong) {
            status = SignType.TIME_WRONG;
        }
        return this.api.insertStuSign(String(lng), String(lat), this.company.companyAddress, status).toPromise().then(res => {
            if (res.code === 1) {
                return this.loadData().then(res=>res);
            } else {
                console.error('签到失败', res);
                return this.loadData().then(res=>res);
            }
        });
    }
}
