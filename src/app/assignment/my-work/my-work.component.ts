import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { UploadComponent } from '../upload/upload.component';
import { HomeworkService } from 'app/services/homework.service';

@Component({
    selector: 'app-my-work',
    templateUrl: './my-work.component.html',
    styleUrls: ['./my-work.component.scss'],
})
export class MyWorkComponent implements OnInit {

    url: string;

    hId: number;

    path: Array<string> = new Array();

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
        let hw = this.hwSvr.getHomeworkById(this.hId);
        if (hw && hw.stuAnsPhoto) {
            hw.stuAnsPhoto.split(',').forEach(e => {
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
