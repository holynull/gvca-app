import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UploadComponent } from '../upload/upload.component';
import { MyWorkComponent } from '../my-work/my-work.component';
import { HomeworkService } from 'app/services/homework.service';
import { PageInfo } from 'app/model/pageInfo';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
        private browserTab: BrowserTab,
        private inAppBrowser: InAppBrowser,
    ) {

    }

    ngOnInit() { }

    ionViewWillEnter() {
        this.pageInfo.firstPage();
        this.homeworkSvr.getHomeWorks(this.pageInfo);
    }

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

    openAttachFile(item) {
        this.browserTab.isAvailable()
            .then(isAvailable => {
                if (isAvailable) {
                    this.browserTab.openUrl(item.dataUrl);
                } else {
                    this.inAppBrowser.create(item.dataUrl, '_system');
                    console.error('Browser Tab is not available.');
                }
            });
    }
}
