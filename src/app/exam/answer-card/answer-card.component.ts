import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-answer-card',
    templateUrl: './answer-card.component.html',
    styleUrls: ['./answer-card.component.scss'],
})
export class AnswerCardComponent implements OnInit {

    constructor(private modalCtrl: ModalController, private router: Router) { }

    ngOnInit() { }
    close() {
        this.modalCtrl.dismiss();
    }

    submit() {
        this.modalCtrl.dismiss();
        this.router.navigate(['/exam/score']);
    }
}
