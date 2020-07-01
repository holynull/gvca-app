import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-ask-leave',
    templateUrl: './ask-leave.component.html',
    styleUrls: ['./ask-leave.component.scss'],
})
export class AskLeaveComponent implements OnInit {

    leaveType: string='3';

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }

    askForLeave() {
        this.modalCtrl.dismiss(Number(this.leaveType));
    }

}
