import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { catchError, retry, timeout, tap } from 'rxjs/operators';
import { ApiUtilsService } from './api-utils.service';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService extends BaseService {

    constructor(
        private http: HttpClient,
        private apiUtils: ApiUtilsService,
        private router: Router,
    ) {
        super();
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
    login(studentName: string, studentPassword: string): Observable<any> {
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
    getAdv(): Observable<any> {
        let url = this.url(environment.api.getAdv.url);
        return this.http.get(url, {}).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * 获取公告
     */
    getNotice(type): Observable<any> {
        let url = this.url(environment.api.getNotice.url);
        let params = new HttpParams().set('type', type);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * 获取公告分类
     */
    getNoticeCats(): Observable<any> {
        let url = this.url(environment.api.getNoticeCats.url);
        return this.http.get(url, {}).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * 获取课程分类
     */
    getCourseCat(): Observable<any> {
        let url = this.url(environment.api.getCourseCat.url);
        return this.http.get(url, {}).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * 获取课程列表
     * @param type 
     * @param pageNo 
     * @param pageSize 
     */
    getCourseList(type: number, pageNo, pageSize): Observable<any> {
        let params = new HttpParams().set('type', String(type)).set('pageNo', String(pageNo)).set('pageSize', String(pageSize));
        let url = this.url(environment.api.getCourseList.url);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * 获取作业列表 
     * @param pageNo 
     * @param pageSize 
     */
    getHomeWorkList(pageNo: number, pageSize: number): Observable<any> {
        let url = this.url(environment.api.getHomeWorkList.url);
        let params = new HttpParams().set('pageNo', String(pageNo)).set('pageSize', String(pageSize));
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    getLessonList(pageNo: number, pageSize: number, courseId: string): Observable<any> {
        let url = this.url(environment.api.getLessonList.url);
        let params = new HttpParams().set('pageNo', String(pageNo)).set('pageSize', String(pageSize))
            .set('courseId', courseId);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    insertStuCourse(cids: string): Observable<any> {
        let url = this.url(environment.api.insertStuCourse.url);
        let params = new HttpParams().set('cids', cids);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    insertStuLesson(cid: string, lid: string, gapTime: string, lessonLength: string): Observable<any> {
        let url = this.url(environment.api.insertStuLesson.url);
        let params = new HttpParams().set('cid', cid).set('lid',lid).set('gapTime',gapTime).set('lessonLength',lessonLength);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }
}
