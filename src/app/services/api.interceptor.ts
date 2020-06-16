import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.auth.token;

        let url = req.url;
        if (token && url.indexOf(environment.api.apiDomain) !== -1) {
            req = req.clone({
                params: req.params.set('token', token),
            });
        }
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {

            }
            return throwError(error);
        }));
    }

}
