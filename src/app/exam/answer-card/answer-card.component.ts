import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExercisesService } from 'app/services/exercises.service';
import { SimulationService } from 'app/services/simulation.service';
import { ExamService } from 'app/services/exam.service';
import { Question } from 'app/model/question';
import { ConstVal } from 'app/constVal';

@Component({
    selector: 'app-answer-card',
    templateUrl: './answer-card.component.html',
    styleUrls: ['./answer-card.component.scss'],
})
export class AnswerCardComponent implements OnInit {

    title: string;

    from: string;

    dataType: string;

    questions: Array<Question> = new Array();

    pid: number;

    qcid: number;

    examId: number;

    constructor(private modalCtrl: ModalController,
        private router: Router,
        private navParams: NavParams,
        public exerSvr: ExercisesService,
        public simuSvr: SimulationService,
        public examSvr: ExamService,
        public loadingCtrl: LoadingController,
    ) {
        this.title = this.navParams.data.title;
        this.from = this.navParams.data.from;
        this.dataType = this.navParams.data.dataType;
        switch (this.dataType) {
            case 'exer':
                if (this.navParams.data.pid && this.navParams.data.qcid) {
                    this.pid = Number(this.navParams.data.pid);
                    this.qcid = Number(this.navParams.data.qcid);
                    this.questions = exerSvr.getQuestions(Number(this.navParams.data.pid), Number(this.navParams.data.qcid));
                }
                break;
            case 'simu':
                if (this.navParams.data.examId) {
                    this.examId = Number(this.navParams.data.examId);
                    this.questions = this.simuSvr.getQuestionsById(Number(this.navParams.data.examId));
                }
                break;
            case 'exam':
                if (this.navParams.data.examId) {
                    this.examId = Number(this.navParams.data.examId);
                    this.questions = this.examSvr.getQuestionsById(Number(this.navParams.data.examId));
                }
                break;
            case 'rand':
                this.questions = this.simuSvr.randomTestPaper;
                break;
        }
    }

    ngOnInit() { }
    close() {
        this.modalCtrl.dismiss();
    }
    selQindex(index: number) {
        this.modalCtrl.dismiss({ qIndex: index });
    }
    async submit() {
        if (this.from && this.from === 'report') {
            this.modalCtrl.dismiss();
        } else {
            let loading;
            if (this.dataType !== 'rand') {
                loading = await this.loadingCtrl.create({
                    message: 'Loading',
                    backdropDismiss: false,
                    duration: ConstVal.LOADING_DURATION_MILLION_SECONDS,
                });
                await loading.present();
            }
            switch (this.dataType) {
                case 'exer':
                    this.exerSvr.submit(this.pid, this.qcid).then(() => {
                        this.modalCtrl.dismiss();
                        loading.dismiss();
                        this.router.navigate(['/exam/score'], { queryParams: { title: this.title, pid: this.pid, qcid: this.qcid, dataType: this.dataType, url: '/tabs/exam' } });
                    });
                    break;
                case 'simu':
                    this.simuSvr.submit(this.examId).then((res) => {
                        this.modalCtrl.dismiss();
                        loading.dismiss();
                        this.router.navigate(['/exam/score'], { queryParams: { title: this.title, examId: this.examId, dataType: this.dataType, ranking: res.ranking, sumPeople: res.sumPeople, url: '/tabs/exam/simulation' } });
                    });
                    break;
                case 'exam':
                    this.examSvr.submit(this.examId).then((res) => {
                        this.modalCtrl.dismiss();
                        loading.dismiss();
                        this.router.navigate(['/exam/score'], { queryParams: { title: this.title, examId: this.examId, dataType: this.dataType, ranking: res.ranking, sumPeople: res.sumPeople, url: '/tabs/exam/examine' } });
                    });
                    break;
                case 'rand':
                    this.modalCtrl.dismiss();
                    this.router.navigate(['/exam/score'], { queryParams: { title: this.title, dataType: this.dataType, url: '/tabs/exam/simulation' } });
                    break;
            }
        }
    }
}
