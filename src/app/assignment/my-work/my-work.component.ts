import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UploadComponent } from '../upload/upload.component';

@Component({
    selector: 'app-my-work',
    templateUrl: './my-work.component.html',
    styleUrls: ['./my-work.component.scss'],
})
export class MyWorkComponent implements OnInit {

    url: string;

    constructor(private modalCtrl: ModalController, private activedRoute: ActivatedRoute) {
        this.activedRoute.queryParams.subscribe(params => {
            if (params && params.from && params.from === 'mine') {
                this.url = '/tabs/mine';
            }
        });
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
            }
        });
        await modal.present();
    }
}
