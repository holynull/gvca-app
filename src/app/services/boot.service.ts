import { Injectable } from '@angular/core';
import { AdvService } from './adv.service';
import { NoticeService } from './notice.service';
import { Storage } from '@ionic/storage';
import { ConstVal } from 'app/constVal';
import { Adv } from 'app/model/adv';

@Injectable({
    providedIn: 'root'
})
export class BootService {

    constructor(
        private storage: Storage,
        private advSrv: AdvService,
        private noticeSvr: NoticeService
    ) {
        this.initData();
    }

    initData() {
        this.storage.get(ConstVal.SLIDE_IMAGES).then(data => {
            if (data) {
                data.forEach((e => {
                    let adv = new Adv();
                    adv.image = e.image;
                    adv.addTime = new Date(e.addTime);
                    adv.slideShowName = e.slideShowName;
                    adv.startTime = new Date(e.startTime);
                    adv.updateTime = new Date(e.updateTime);
                    adv.endTime = new Date(e.endTime);
                    adv.slideShowId = e.slideShowId;
                    adv.url = e.url;
                    adv.status = e.status;
                    this.advSrv.advs.push(adv);
                }));
            } else {
                let adv1 = new Adv();
                adv1.image = 'assets/images/index_banner.jpg';
                let adv2 = new Adv();
                adv2.image = 'assets/images/index_banner2.jpg';
                this.advSrv.advs.push(adv1);
                this.advSrv.advs.push(adv2);
            }
            this.advSrv.loadData();
        });
        this.noticeSvr.loadeData();
    }
}
