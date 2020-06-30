import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { ApiService } from './api.service';
import { SignRecord } from 'app/model/sign-record';
import { SignStatus } from 'app/model/sign-status.enum';
import { Company } from 'app/model/company';
import { DatePipe } from '@angular/common';

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

    loadData() {
        this.api.getSignCompany().toPromise().then(res => {
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
            } else {
                console.error('获取用户签到公司数据出错', res);
            }
        });
        let year = new Date().getFullYear();
        this.api.getSignList(String(year)).toPromise().then(res => {
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
                    record.timedate = String(e.graaaaaa);
                    record.holidayState = Number(e.holidayState);
                    record.recordId = Number(e.recordId);
                    record.studentId = Number(e.studentId);
                    record.classId = Number(e.classId);
                    record.schoolId = Number(e.schoolId);
                    record.company = Number(e.company);
                    record.longitude = Number(e.longitude);
                    this.records.push(record);
                });
            } else {
                console.error('获取用户签到记录出错', res);
            }
        });
    }

    signStatus(d: Date): SignStatus {
        for (let i = 0; i < this.records.length; i++) {
            if (d.toDateString() === this.records[i].signDate.toDateString()) {
                return this.records[i].signStatus;
            }
        }
        return SignStatus.NONE;
    }

    getRecord(d: Date): SignRecord {
        for (let i = 0; i < this.records.length; i++) {
            if (this.records[i].signDate.toDateString() === d.toDateString()) {
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
        let datePipe=new DatePipe(this.locale);
        let str = datePipe.transform(date, 'yyyyMMdd');
        return this.api.updateExemptState(str).toPromise().then(res => {
            if (res.code === 1) {
                return true;
            } else {
                return false;
            }
        });
    }
}
