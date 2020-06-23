import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ExamTipsComponent } from '../exam-tips/exam-tips.component';
import { PopMenuComponent } from '../pop-menu/pop-menu.component';
import { ExamService } from 'app/services/exam.service';
import { TestPaper } from 'app/model/test-paper';
import { Router } from '@angular/router';

@Component({
    selector: 'app-examine',
    templateUrl: './examine.component.html',
    styleUrls: ['./examine.component.scss'],
})
export class ExamineComponent implements OnInit {

    constructor(
        private popOverCtrl: PopoverController,
        private modalCtrl: ModalController,
        public examSvr: ExamService,
        private router: Router,
    ) { }

    ngOnInit() {
        if (!this.examSvr.enabled) {
            this.presentTips();
        }
    }

    async openPopMenu() {
        const dialog = await this.popOverCtrl.create({
            component: PopMenuComponent,
            cssClass: 'pop-top-menu',
            showBackdrop: true,
            backdropDismiss: true,
            componentProps: {
                title: "考试题库",
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

    doRefresh(event) {
        this.examSvr.loadData().then(() => {
            event.target.complete();
        });
    }

    goToAnswer(detail: TestPaper) {
        if (detail.questions.length > 0) {
            this.router.navigate(['/exam/answer'], { queryParams: { title: detail.examName, examId: detail.examId, from: 'exam' } });
        }
    }
}
