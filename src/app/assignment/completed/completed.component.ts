import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeworkService } from 'app/services/homework.service';
import { UploadComponent } from '../upload/upload.component';
import { MyWorkComponent } from '../my-work/my-work.component';

@Component({
    selector: 'app-completed',
    templateUrl: './completed.component.html',
    styleUrls: ['./completed.component.scss'],
})
export class CompletedComponent implements OnInit {

    constructor(
        private modalCtrl: ModalController,
        public homeworkSvr: HomeworkService,
    ) { }

    ngOnInit() { }
    async toUpload(hId: number) {
        const modal = await this.modalCtrl.create({
            component: UploadComponent,
            componentProps: {
                hId: hId,
            }
        });
        await modal.present();
    }
    async toMyWork(hId: number) {
        const modal = await this.modalCtrl.create({
            component: MyWorkComponent,
            componentProps: {
                hId: hId,
                hwType:
            }
        });
        await modal.present();
    }

    doRefresh(event) {
        this.homeworkSvr.loadCompletedHomeWork().then(success => {
            event.target.complete();
        });
    }
}
