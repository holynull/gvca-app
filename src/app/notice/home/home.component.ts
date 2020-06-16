import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { NoticeService } from 'app/services/notice.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    curTab: number = 1;

    title: string = '校内通知';

    constructor(
        private router: Router,
        private activedRoute: ActivatedRoute,
        public noticeSvr: NoticeService,
    ) {
        this.activedRoute.queryParams.subscribe(params => {
            if (params && params.tab) {
                this.curTab = Number(params.tab);
            }
            if (params && params.title) {
                this.title = params.title;
            }
        });
    }

    ngOnInit() { }

    changeTab(tab, title) {
        this.curTab = tab;
        this.title = title;
    }

    showDetail(type, noticeId) {
        this.router.navigate(['/notice/detail'], { queryParams: { type: type, id: noticeId, tab: this.curTab } });
    }

}
