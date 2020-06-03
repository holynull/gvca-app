import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AskLeaveComponent } from '../ask-leave/ask-leave.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    signed: boolean = false;

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }

    sign() {
        this.signed = !this.signed;
    }

    async toAskForLeave() {
        const modal = await this.modalCtrl.create({
            component: AskLeaveComponent,
            cssClass: 'modal-dialog',
            // backdropDismiss: false,
            componentProps: {
            }
        });
        await modal.present();
    }

}
