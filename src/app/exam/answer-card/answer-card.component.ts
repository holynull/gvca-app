import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-answer-card',
    templateUrl: './answer-card.component.html',
    styleUrls: ['./answer-card.component.scss'],
})
export class AnswerCardComponent implements OnInit {

    title: string;

    from: string;

    constructor(private modalCtrl: ModalController,
        private router: Router,
        private navParams: NavParams,
    ) {
        this.title = this.navParams.data.title;
        this.from = this.navParams.data.from;
    }

    ngOnInit() { }
    close() {
        this.modalCtrl.dismiss();
    }

    submit() {
        this.modalCtrl.dismiss();
        if (this.from && this.from === 'report') {
            // this.router.navigate(['/exam/report'], { queryParams: { title: this.title } });
        } else { // 交卷
            this.router.navigate(['/exam/score'], { queryParams: { title: this.title } });
        }
    }
}
