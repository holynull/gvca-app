import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ExamTipsComponent } from '../exam-tips/exam-tips.component';
import { PopMenuComponent } from '../pop-menu/pop-menu.component';

@Component({
    selector: 'app-examine',
    templateUrl: './examine.component.html',
    styleUrls: ['./examine.component.scss'],
})
export class ExamineComponent implements OnInit {

    constructor(private popOverCtrl: PopoverController, private modalCtrl: ModalController) { }

    ngOnInit() {
        this.presentTips();
    }

    async openPopMenu() {
        const dialog = await this.popOverCtrl.create({
            component: PopMenuComponent,
            cssClass: 'pop-top-menu',
            showBackdrop: true,
            backdropDismiss: true,
            componentProps: {
                title: "模拟题库",
            }
        });
        await dialog.present();
        let dismissData = await dialog.onDidDismiss();
    }

    async presentTips() {
        const modal = await this.modalCtrl.create({
            component: ExamTipsComponent,
            cssClass: 'modal-dialog',
            // backdropDismiss: false,
            componentProps: {
            }
        });
        await modal.present();
    }

}
