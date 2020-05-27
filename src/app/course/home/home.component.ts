import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    curTab = 1;

    constructor(
        private modalCtrl: ModalController,
    ) { }

    ngOnInit() { }

    select(tab) {
        this.curTab = tab;
    }
    async presentConfirm(callBackOk: Function) {
        const modal = await this.modalCtrl.create({
            component: ConfirmComponent,
            cssClass: 'modal-dialog',
            backdropDismiss: false,
            componentProps: {
                'firstName': 'Douglas',
                'lastName': 'Adams',
                'middleInitial': 'N'
            }
        });
        await modal.present();
        const res = await modal.onWillDismiss();
        if (res.data && res.data.pressOk) {
            callBackOk();
        }
    }
    confirm() {
        this.presentConfirm(() => {
            console.log("press ok");
        });
    }
}
