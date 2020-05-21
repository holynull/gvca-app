import { Router } from '@angular/router';
import { environment } from "@env/environment";
import { Subject } from 'rxjs';


export interface ServiceEvent {
    code: string;
    data: any;
}

export class BaseService {

    subject: Subject<any>;

    apiPrefix(): string {
        if (environment.api.useProxy) {
            return '';
        } else {
            return this.apiProtocol + '://' + this.apiDomain;
        }
    }

    apiDomain: string;

    apiProtocol: string;


    constructor() {
        this.apiDomain = environment.api.apiDomain;
        this.apiProtocol = environment.api.apiProtocol;
        this.subject = new Subject<any>();
    }

    /**
     * 绑定事件处理函数，支持多播
     * @param event
     * @param funct
     */
    public bind(event, funct: (event: ServiceEvent) => void) {
        let subscription = this.subject.subscribe((ev: ServiceEvent) => {
            if (ev.code === event) {
                funct(ev);
            }
        });
        return subscription;
    }

    public emit(event: ServiceEvent) {
        this.subject.next(event);
    }

    protected errorHandler(data, router: Router) {
        // TODO: 接口返回权限错误，则返回到登录页面
        if (data.err === 1) {
            router.navigate(['login'], { queryParams: { url: router.url } });
        } else {
            return data;
        }
    }

    protected url(url: string): string {
        return this.apiPrefix() + url;
    }
}
