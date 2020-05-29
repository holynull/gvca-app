import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AnswerCardComponent } from '../answer-card/answer-card.component';
import { interval } from 'rxjs';

@Component({
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {

    title: string;
    // 倒计时总秒数
    seconds = 60 * 90;

    h: string = '00'; // 倒计时小时
    m: string = '00'; // 倒计时分钟
    s: string = '00'; // 倒计时秒

    constructor(private activeRoute: ActivatedRoute, private modalCtrl: ModalController) {
        this.activeRoute.queryParams.subscribe(params => {
            if (params && params.title) {
                this.title = params.title;
            }
        });
    }

    ngOnInit() {
        this.getTime(this.seconds);
        let timer = interval(1000).subscribe(n => {
            let left = this.seconds - n;
            if (left === 0) {
                timer.unsubscribe();
            }
            this.getTime(left);
        });
    }

    getTime(left) {
        if (left === 0) {
            this.h = '00';
            this.m = '00';
            this.s = '00';
        } else {
            let h = Math.floor(left / 3600);
            this.h = h < 10 ? '0' + h : String(h);
            let m = Math.floor(left % 3600 / 60);
            this.m = m < 10 ? '0' + m : String(m);
            let s = left % 3600 % 60;
            this.s = s < 10 ? '0' + s : String(s);
        }
    }

    async openAnswerCard() {
        const modal = await this.modalCtrl.create({
            component: AnswerCardComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                title: this.title,
            }
        });
        return await modal.present();
    }

}
