import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {environment} from "@env/environment";
import {Storage} from "@ionic/storage";
import { ConstVal } from '../constVal';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private storage: Storage) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem(ConstVal.ACCESS_TOKEN);
        
        let url = req.url;
        if (token && !req.headers.has('Authorization') && url.indexOf(environment.api.apiDomain) !== -1) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {

            }
            return throwError(error);
        }));
    }

}
