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

    /**
     * id:10
     * @param cid 
     * @param lid 
     * @param gapTime 
     * @param lessonLength 
     */
    insertStuLesson(cid: string, lid: string, gapTime: string, lessonLength: string): Observable<any> {
        let url = this.url(environment.api.insertStuLesson.url);
        let params = new HttpParams().set('cid', cid).set('lid', lid).set('gapTime', gapTime).set('lessonLength', lessonLength);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * id:11
     */
    getEaxmCourseList(): Observable<any> {
        let url = this.url(environment.api.getEaxmCourseList.url);
        return this.http.get(url, {}).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * id:12
     * @param pid 
     */
    getEaxmCourseDetailList(pid: string): Observable<any> {
        let url = this.url(environment.api.getEaxmCourseDetailList.url);
        let params = new HttpParams().set('pid', pid);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * id:13
     * @param qcid 
     */
    getQuestionList(qcid: string): Observable<any> {
        let url = this.url(environment.api.getQuestionList.url);
        let params = new HttpParams().set('qcid', qcid);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * id:14
     * @param type 2模拟题库，3考试题库 
     */
    getExamList(type: string): Observable<any> {
        let url = this.url(environment.api.getExamList.url);
        let params = new HttpParams().set('type', type);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * id:15
     * @param examId 
     */
    getExamQuestionList(examId: string): Observable<any> {
        let url = this.url(environment.api.getExamQuestionList.url);
        let params = new HttpParams().set('examId', examId);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * id:16
     * @param jsonlist 
     * @param qcpid 
     * @param qcid 
     */
    insertStuLxQuestion(jsonlist: string, qcpid: string, qcid: string): Observable<any> {
        let url = this.url(environment.api.insertStuLxQuestion.url);
        let params = new HttpParams().set('jsonlist', jsonlist).set('qcpid', qcpid).set('qcid', qcid);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }

    /**
     * id:17
     * @param jsonlist 
     * @param examId 
     */
    insertStuQuestion(jsonlist: string, examId: string): Observable<any> {
        let url = this.url(environment.api.insertStuQuestion.url);
        let params = new HttpParams().set('jsonlist', jsonlist).set('examId', examId);
        return this.http.get(url, { params: params }).pipe(tap(res => this.errorHandler(res, this.router)), timeout(environment.api.default.timeoutMs), retry(environment.api.default.retryTimes), catchError(e => {
            this.apiUtils.presentAlert(e, environment.api.default.debug);
            return of(e);
        }));
    }
}
