import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { ApiUtilsService } from './api-utils.service';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService extends BaseService {

    constructor(private http: HttpClient, private apiUtils: ApiUtilsService) {
        super();
    }

    // TODO: 例子
    getExample(param: string): Observable<any> {
        const params = new HttpParams().set('param', param);
        let url = this.url(environment.api.example.url);
        return this.http.post(url, params).pipe(timeout(environment.api.example.timeoutMs), retry(environment.api.example.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.example.debug);
            return of(e);
        }));
    }

    //TODO: 测试下载
    testDownload(url): Observable<any> {
        return this.http.get(url, {
            responseType: "blob",
            reportProgress: true,
            observe: "events",
            headers: new HttpHeaders(
                { 'Content-Type': 'video/mp4', "Cache-Control": 'no-cache' },
            )
        });
    }

    /**
     * 
     * @param studentName 登录
     * @param studentPassword 
     */
    login(studentName: string, studentPassword: string) {
        const params = new HttpParams().set('studentName', studentName).set('studentPassword', studentPassword);
        let url = this.url(environment.api.login.url);
        return this.http.post(url, params).pipe(timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * 获取轮播图
     */
    getAdv() {
        let url = this.url(environment.api.getAdv.url);
        return this.http.get(url,{} ).pipe(timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }
}
