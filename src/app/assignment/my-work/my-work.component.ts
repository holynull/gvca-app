import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { UploadComponent } from '../upload/upload.component';
import { HomeworkService } from 'app/services/homework.service';
import { Homework } from 'app/model/homework';

@Component({
    selector: 'app-my-work',
    templateUrl: './my-work.component.html',
    styleUrls: ['./my-work.component.scss'],
})
export class MyWorkComponent implements OnInit {

    url: string;

    hId: number;

    path: Array<string> = new Array();

    hw: Homework;

    hwType: string;

    constructor(
        private modalCtrl: ModalController,
        private activedRoute: ActivatedRoute,
        private navParams: NavParams,
        private hwSvr: HomeworkService,
    ) {
        this.activedRoute.queryParams.subscribe(params => {
            if (params && params.from && params.from === 'mine') {
                this.url = '/tabs/mine';
            }
        });
        this.hId = this.navParams.data.hId;
        this.hwType = this.navParams.data.hwType;
        if (this.hwType === 'completed') {
            this.hw = this.hwSvr.getCHomeworkById(this.hId);
        } else {
            this.hw = this.hwSvr.getHomeworkById(this.hId);
        }
        if (this.hw && this.hw.stuAnsPhoto) {
            this.hw.stuAnsPhoto.split(',').forEach(e => {
                this.path.push(e);
            });
        }
    }

    ngOnInit() { }

    close() {
        this.modalCtrl.dismiss();
    }

    async toUpload() {
        // this.modalCtrl.dismiss();
        const modal = await this.modalCtrl.create({
            component: UploadComponent,
            componentProps: {
                hId: this.hId,
            }
        });
        await modal.present();
    }
}
