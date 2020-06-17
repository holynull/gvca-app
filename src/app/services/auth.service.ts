import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ConstVal } from "../constVal";
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { UserInfo } from 'app/model/userinfo';
import { Router } from '@angular/router';
import { BootService } from './boot.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

    userInfo = new UserInfo();

    token: string;

    /**
     * 用户登录状态 true登录，false未登录
     */
    isAuthenticatedStatus = false;


    constructor(private storage: Storage, private api: ApiService,
        private router: Router,
        private boot: BootService,
    ) {
        super();
        this.checkAuthenticated();
    }



    /**
     * 判断用户token的状态
     */
    checkAuthenticated() {
        this.storage.get(ConstVal.ACCESS_TOKEN).then(token => {
            if (token) {
                this.token = token;
                localStorage.setItem(ConstVal.ACCESS_TOKEN, token);
                this.isAuthenticatedStatus = true;
                // 调用远程接口，检查token；不需要了，因为token不会过期
            }
        });
        this.storage.get(ConstVal.USER_INFO).then(studentInfo => {
            if (studentInfo) {
                this.userInfo = new UserInfo();
                this.userInfo.companyPosition = studentInfo.companyPosition;
                this.userInfo.addTime = new Date(studentInfo.addTime);
                this.userInfo.idCard = studentInfo.idCard;
                this.userInfo.departmentId = studentInfo.departmentId;
                this.userInfo.className = studentInfo.className;
                this.userInfo.studentId = studentInfo.studentId;
                this.userInfo.classId = studentInfo.classId;
                this.userInfo.schoolId = studentInfo.schoolId;
                this.userInfo.studentStatus = studentInfo.studentStatus;
                this.userInfo.emergencyContactTel = studentInfo.emergencyContactTel;
                this.userInfo.studentSex = studentInfo.studentSex;
                this.userInfo.departmentName = studentInfo.departmentName;
                this.userInfo.gradeName = studentInfo.gradeName;
                this.userInfo.gradeId = studentInfo.gradeId;
                this.userInfo.majorId = studentInfo.majorId;
                this.userInfo.emergencyContact = studentInfo.emergencyContact;
                this.userInfo.semesterName = studentInfo.semesterName;
                this.userInfo.updateTime = new Date(studentInfo.updateTime);
                this.userInfo.studentPassword = studentInfo.studentPassword;
                this.userInfo.semesterId = studentInfo.semesterId;
                this.userInfo.companyId = studentInfo.companyId;
                this.userInfo.studentName = studentInfo.studentName;
                this.userInfo.studentAddress = studentInfo.studentAddress;
                this.userInfo.majorName = studentInfo.majorName;
                this.userInfo.studentNum = studentInfo.studentNum;
            }
        });
    }

    /**
     * guard 用到的函数
     */
    isAuthenticated(): Promise<boolean> {
        return this.storage.get(ConstVal.ACCESS_TOKEN).then(token => {
            if (token) {
                this.isAuthenticatedStatus = true;
                return true;
            } else {
                this.isAuthenticatedStatus = false;
                let url = location.pathname;
                this.router.navigate(['/login'], { queryParams: { url: url } });
                return false;
            }
        });
    }



    /**
     * 获取当前token的用户信息
     */
    getUserInfo() {

    }


    public logout() {
        this.logoutClear();
    }

    public logoutClear() {
        this.storage.remove(ConstVal.ACCESS_TOKEN).then();
        localStorage.removeItem(ConstVal.ACCESS_TOKEN);
        this.storage.remove(ConstVal.USER_INFO).then();
        this.isAuthenticatedStatus = false;
    }

    public login(userName: string, password: string): Observable<any> {
        if (userName && password) {
            return this.api.login(userName, password).pipe(map(res => {
                if (res.code === 1) {
                    this.isAuthenticatedStatus = true;
                    this.token = res.token;
                    localStorage.setItem(ConstVal.ACCESS_TOKEN, this.token);
                    this.storage.set(ConstVal.ACCESS_TOKEN, res.token).then();
                    this.userInfo = new UserInfo();
                    this.userInfo.companyPosition = res.studentInfo.companyPosition;
                    this.userInfo.addTime = res.studentInfo.addTime;
                    this.userInfo.idCard = res.studentInfo.idCard;
                    this.userInfo.departmentId = res.studentInfo.departmentId;
                    this.userInfo.className = res.studentInfo.className;
                    this.userInfo.studentId = res.studentInfo.studentId;
                    this.userInfo.classId = res.studentInfo.classId;
                    this.userInfo.schoolId = res.studentInfo.schoolId;
                    this.userInfo.studentStatus = res.studentInfo.studentStatus;
                    this.userInfo.emergencyContactTel = res.studentInfo.emergencyContactTel;
                    this.userInfo.studentSex = res.studentInfo.studentSex;
                    this.userInfo.departmentName = res.studentInfo.departmentName;
                    this.userInfo.gradeName = res.studentInfo.gradeName;
                    this.userInfo.gradeId = res.studentInfo.gradeId;
                    this.userInfo.majorId = res.studentInfo.majorId;
                    this.userInfo.emergencyContact = res.studentInfo.emergencyContact;
                    this.userInfo.semesterName = res.studentInfo.semesterName;
                    this.userInfo.updateTime = res.studentInfo.updateTime;
                    this.userInfo.studentPassword = res.studentInfo.studentPassword;
                    this.userInfo.semesterId = res.studentInfo.semesterId;
                    this.userInfo.companyId = res.studentInfo.companyId;
                    this.userInfo.studentName = res.studentInfo.studentName;
                    this.userInfo.studentAddress = res.studentInfo.studentAddress;
                    this.userInfo.majorName = res.studentInfo.majorName;
                    this.userInfo.studentNum = res.studentInfo.studentNum;
                    this.storage.set(ConstVal.USER_INFO, this.userInfo).then();
                    this.boot.initData();
                    return { code: 1, msg: '登录成功' };
                } else if (res.code === 0) { //账号或者密码错误
                    return { code: res.code, msg: '用户名或者密码错误' };
                } else { // 其他错误
                    return { code: res.code, msg: '其他错误' };
                }
            }));
        } else {
            return of({ code: -1, msg: "请输入用户名和密码" });
        }
    }
}
