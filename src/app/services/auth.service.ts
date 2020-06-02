import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConstVal } from "../constVal";
import { BaseService } from './base.service';

export class UserInfo {
    accountId: string;
    areaCode: string;
    digitId: number;
    email: string;
    googleBind: number;
    lang: string;
    mobile: string;
    role: number;
    username: string;
    withdrawLimitTime: number;
    withdrawStatus: number;

    /**
     * 用于隐藏邮箱或者手机号
     */
    getHiddenIdentity() {
        if (this.email) {
            let username = this.email;
            let name = username.substring(0, username.indexOf('@'));
            let replace;
            if (name && name.length > 1) {
                replace = name.substring(name.length - 4, name.length);
            }
            if (replace && replace.length > 0) {
                let val = '';
                for (let i = 0; i < replace.length; i++) {
                    val = val + '*';
                }
                username = username.replace(replace, val);
            }
            return username;
        } else if (this.mobile) {
            let mobile = this.mobile;
            return mobile.substring(0, 3) + '****' + mobile.substring(7);
        } else {
            return null;
        }
    }


}


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


    constructor(private storage: Storage) {
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
                this.isAuthenticatedStatus = true;
                // TODO: 调用远程接口，检查token
            } else {
                this.isAuthenticatedStatus = false;
            }
        });

    }

    /**
     * guard 用到的函数
     */
    isAuthenticated(): Observable<boolean> {
        if (this.isAuthenticatedStatus) {
            return of(true);
        } else {
            return of(false);
        }
    }



    /**
     * 获取当前token的用户信息
     */
    getUserInfo() {

    }


    public logout() {
        this.storage.remove(ConstVal.ACCESS_TOKEN).then();
        this.isAuthenticatedStatus = false;
    }

    public logoutClear() {
        this.storage.remove(ConstVal.ACCESS_TOKEN);
        this.isAuthenticatedStatus = false;

    }

    public login(userName: string, password: string): Observable<any> {
        if (userName && password) {
            return of({ err: 0, msg: "登录成功" }).pipe(tap(res => {
                this.isAuthenticatedStatus = true;
                this.storage.set(ConstVal.ACCESS_TOKEN, "lallalalwoshi token").then();
            }));
        } else {
            return of({ err: -1, msg: "请输入用户名和密码" });
        }
    }
}
