import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { PopMenuComponent } from '../pop-menu/pop-menu.component';
import { SimuTipsComponent } from '../simu-tips/simu-tips.component';
import { SimulationService } from 'app/services/simulation.service';
import { TestPaper } from 'app/model/test-paper';
import { Router } from '@angular/router';
import { UsedState } from 'app/model/used-state.enum';
import { ConstVal } from 'app/constVal';

@Component({
    selector: 'app-simulation',
    templateUrl: './simulation.component.html',
    styleUrls: ['./simulation.component.scss'],
})
export class SimulationComponent implements OnInit {

    constructor(
        private popOverCtrl: PopoverController,
        private modalCtrl: ModalController,
        public simuSvr: SimulationService,
        private router: Router,
        private loadingCtrl: LoadingController,
    ) { }

    ngOnInit() {
        if (!this.simuSvr.enabled) {
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

    doRefresh(event) {
        this.simuSvr.loadData().then(() => {
            event.target.complete();
        });
    }

    goToAnswer(detail: TestPaper) {
        if (detail.questions.length > 0 && detail.usedState === UsedState.DONE) {
            this.router.navigate(['/exam/report'], { queryParams: { title: detail.examName, examId: detail.examId, dataType: 'simu', url: '/tabs/exam/simulation' } });
        } else if (detail.questions.length > 0 && detail.usedState === UsedState.NONE) {
            this.router.navigate(['/exam/answer'], { queryParams: { title: detail.examName, examId: detail.examId, dataType: 'simu', url: '/tabs/exam/simulation' } });
        }
    }

    async getRandom() {
        let loading = await this.loadingCtrl.create({
            message: 'Loading',
            backdropDismiss: false,
            duration: ConstVal.LOADING_DURATION_MILLION_SECONDS,
        });
        this.simuSvr.getRandomTestPaper().then(res => {
            if (res === true) {
                this.router.navigate(['/exam/answer'], { queryParams: { title: '随机组卷', dataType: 'rand', url: '/tabs/exam/simulation' } });
            }
            loading.dismiss();
        });
    }
}
