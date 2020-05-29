import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UploadComponent } from '../upload/upload.component';
import { MyWorkComponent } from '../my-work/my-work.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }

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
}
