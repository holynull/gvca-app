import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { NoticeCat } from 'app/model/notice-cat';
import { Notice } from 'app/model/notice';

@Injectable({
    providedIn: 'root'
})
export class NoticeService {

    noticeCats: Array<NoticeCat> = new Array();

    constructor(
        private api: ApiService,
    ) {
    }

    loadeData() {
        this.api.getNoticeCats().subscribe(res => {
            if (res.code === 1) {
                this.noticeCats.splice(0, this.noticeCats.length);
                res.info.forEach(e => {
                    let ncat = new NoticeCat();
                    ncat.noticeCatId = e.noticeCatId;
                    ncat.name = e.name;
                    ncat.onlineState = e.onlineState;
                    this.api.getNotice(ncat.noticeCatId).subscribe(nRes => {
                        if (nRes.code === 1) {
                            nRes.info.forEach(e => {
                                let notice = new Notice();
                                notice.addTime = new Date(e.addTime);
                                notice.sender = e.sender;
                                notice.schoolId = e.schoolId;
                                notice.noticeStatus = e.noticeStatus;
                                notice.updateTime = new Date(e.updateTime);
                                notice.title = e.title;
                                notice.noticeId = e.noticeId;
                                notice.content = e.content;
                                notice.dataUrl = e.dataUrl;
                                ncat.notices.push(notice);
                            });
                        } else {
                            console.error(nRes, {});
                        }
                    });
                    this.noticeCats.push(ncat);
                });
            } else {
                console.error(res, {});
            }
        });
    }
    /**
     * 获取首页公告列表
     */
    getHomeNotice() {
        for (let i = 0; i < this.noticeCats.length; i++) {
            if (this.noticeCats[i].noticeCatId === 1) {
                return this.noticeCats[i].notices;
            }
        }
        return null;
    }


}
