import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AnswerCardComponent } from '../answer-card/answer-card.component';

@Component({
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {

    title: string;

    constructor(private activeRoute: ActivatedRoute,private modalCtrl:ModalController) {
        this.activeRoute.queryParams.subscribe(params => {
            if (params && params.title) {
                this.title = params.title;
            }
        });
    }

    ngOnInit() { }

    async openAnswerCard(){
        const modal = await this.modalCtrl.create({
            component: AnswerCardComponent,
            cssClass: 'my-custom-class'
          });
          return await modal.present();
    }

}
