import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UploadComponent } from '../upload/upload.component';

@Component({
    selector: 'app-my-work',
    templateUrl: './my-work.component.html',
    styleUrls: ['./my-work.component.scss'],
})
export class MyWorkComponent implements OnInit {

    constructor(private modalCtrl: ModalController) { }

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
