import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }

    ok() {
        this.modalCtrl.dismiss({ pressOk: true });
    }

    cancel() {
        this.modalCtrl.dismiss({ pressOk: false });
    }

}
