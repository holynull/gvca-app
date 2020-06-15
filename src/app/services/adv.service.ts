import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Adv } from 'app/model/adv';
import { Storage } from '@ionic/storage';
import { ConstVal } from 'app/constVal';

@Injectable({
    providedIn: 'root'
})
export class AdvService {

    advs: Array<Adv> = new Array();

    constructor(
        private api: ApiService,
        private storage: Storage,
    ) {
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
                    this.advs.push(adv);
                }));
            }
        });
        this.loadData();
    }

    loadData() {
        this.api.getAdv().subscribe(res => {
            if (res.code === 1) {
                res.info.forEach((e, index, arr) => {
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
                    this.advs.splice(index, 1);
                    this.advs.push(adv);
                });
            } else if (res.code === 0) {

            } else if (res.code === -1) {
                console.error('token 错误');
            }
        });
    }
}
