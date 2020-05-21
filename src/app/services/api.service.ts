import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { timeout, retry, catchError } from 'rxjs/operators';
import { ApiUtilsService } from './api-utils.service';

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
}
