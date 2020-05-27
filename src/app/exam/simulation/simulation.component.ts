import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopMenuComponent } from '../pop-menu/pop-menu.component';
import { SimuTipsComponent } from '../simu-tips/simu-tips.component';

@Component({
    selector: 'app-simulation',
    templateUrl: './simulation.component.html',
    styleUrls: ['./simulation.component.scss'],
})
export class SimulationComponent implements OnInit {

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
            component: SimuTipsComponent,
            cssClass: 'modal-dialog',
            // backdropDismiss: false,
            componentProps: {
                tipsIndex: 1
            }
        });
        await modal.present();
    }
}
