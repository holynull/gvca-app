import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-answer-card',
    templateUrl: './answer-card.component.html',
    styleUrls: ['./answer-card.component.scss'],
})
export class AnswerCardComponent implements OnInit {

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }
    close() {
        this.modalCtrl.dismiss();
    }
}
