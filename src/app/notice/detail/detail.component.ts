import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notice } from 'app/model/notice';
import { NoticeService } from 'app/services/notice.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    type: number;

    id: number;

    curTab: number;

    notice: Notice;

    url: string;

    constructor(
        private activedRoute: ActivatedRoute,
        private noticeSvr: NoticeService,
    ) {
        this.activedRoute.queryParams.subscribe(params => {
            if (params.url) {
                this.url = params.url;
            }
            if (params && params.tab) {
                this.curTab = params.tab;
            }
            if (params && params.type && params.id) {
                this.type = Number(params.type);
                this.id = Number(params.id);
                let cat = this.noticeSvr.noticeCats.filter(e => e.noticeCatId === this.type);
                if (cat && cat.length > 0) {
                    let ns = cat[0].notices.filter(e => e.noticeId === this.id);
                    if (ns && ns.length > 0) {
                        this.notice = ns[0];
                    } else {
                        console.error('未找到公告', {});
                    }
                } else {
                    console.error('未找到公告类别', {});
                }
            }
        });
    }

    ngOnInit() { }

}
