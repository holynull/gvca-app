import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UploadComponent } from '../upload/upload.component';
import { MyWorkComponent } from '../my-work/my-work.component';
import { HomeworkService } from 'app/services/homework.service';
import { PageInfo } from 'app/model/pageInfo';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    pageInfo: PageInfo = new PageInfo();

    constructor(
        private modalCtrl: ModalController,
        public homeworkSvr: HomeworkService,
    ) {

    }

    ngOnInit() { }

    ionViewWillEnter() {
        this.pageInfo.firstPage();
        this.homeworkSvr.getHomeWorks(this.pageInfo);
    }

    async toUpload() {
        const modal = await this.modalCtrl.create({
            component: UploadComponent,
            componentProps: {
            }
        });
        await modal.present();
    }
    async toMyWork() {
        const modal = await this.modalCtrl.create({
            component: MyWorkComponent,
            componentProps: {
            }
        });
        await modal.present();
    }
    doRefresh(event) {
        this.pageInfo.firstPage();
        this.homeworkSvr.getHomeWorks(this.pageInfo, () => {
            event.target.complete();
        });
    }

    loadData(event) {
        this.pageInfo.nextPage();
        this.homeworkSvr.getHomeWorks(this.pageInfo, () => {
            event.target.complete();
        });
    }
}
