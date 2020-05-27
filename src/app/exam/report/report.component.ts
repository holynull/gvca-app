import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AnswerCardComponent } from '../answer-card/answer-card.component';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

    title: string;

    constructor(
        private activeRoute: ActivatedRoute,
        private modalCtrl: ModalController,
    ) {
        this.activeRoute.queryParams.subscribe(params => {
            if (params && params.title) {
                this.title = params.title;
            }
        });
    }

    ngOnInit() { }
    async openAnswerCard() {
        const modal = await this.modalCtrl.create({
            component: AnswerCardComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                title: this.title,
                from: "report"
            }
        });
        return await modal.present();
    }
}
