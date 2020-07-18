import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, Gesture, GestureController } from '@ionic/angular';
import { AnswerCardComponent } from '../answer-card/answer-card.component';
import { Question } from 'app/model/question';
import { ExercisesService } from 'app/services/exercises.service';
import { SimulationService } from 'app/services/simulation.service';
import { ExamService } from 'app/services/exam.service';
import { QuestionType } from 'app/model/question-type.enum';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

    @ViewChild('content', {})
    ionContent: ElementRef;

    qIndex: number = 0;

    title: string;

    slideFromRight: Gesture;

    questions: Array<Question> = new Array();

    pid: number;

    qcid: number;

    examId: number;

    dataType: string;

    url = "/exam/score";

    tab: string;

    constructor(
        private activeRoute: ActivatedRoute,
        private modalCtrl: ModalController,
        private gestureCtrl: GestureController,
        public eSvr: ExercisesService,
        public sSvr: SimulationService,
        public examSvr: ExamService,
    ) {
        setTimeout(() => {
            this.slideFromRight = this.gestureCtrl.create({
                el: this.ionContent.nativeElement,
                threshold: 15,
                gestureName: 'slide-from-right',
                direction: 'x',
                onMove: ev => this.onGestureMove(ev),
                onStart: ev => this.onGestureStart(ev),
                onEnd: ev => this.onGestureEnd(ev),
            }, true);
            this.slideFromRight.enable();
        }, 0);
        this.activeRoute.queryParams.subscribe(params => {
            this.title = params.title;
            this.dataType = params.dataType;
            this.pid = params.pid;
            this.qcid = params.qcid;
            this.examId = params.examId;
            this.url = params.url;
            this.tab = params.tab;
            switch (this.dataType) {
                case 'exer':
                    if (params.pid && params.qcid) {
                        this.questions = eSvr.getQuestions(Number(params.pid), Number(params.qcid));
                    }
                    break;
                case 'simu':
                    if (params.examId) {
                        this.examId = params.examId;
                        this.questions = this.sSvr.getQuestionsById(Number(params.examId));
                    }
                    break;
                case 'exam':
                    if (params.examId) {
                        this.questions = this.examSvr.getQuestionsById(Number(params.examId));
                    }
                    break;
            }
        });
    }

    onGestureMove(ev) {
        // console.log(ev);
    }
    onGestureStart(ev) {
        // console.log(ev);
    }

    allowTrigger(ev) {
        let time = ev.currentTime - ev.startTime;
        let span = Math.abs(ev.currentX - ev.startX);
        return span > 20
    }
    onGestureEnd(ev) {
        console.log(ev);
        if (ev.startX > ev.currentX) {
            if (this.allowTrigger(ev)) {
                this.next();
            }
        } else {
            if (this.allowTrigger(ev)) {
                this.prev();
            }
        }
    }

    next() {
        if (this.qIndex !== (this.questions.length - 1)) {
            this.qIndex++;
        } else {
            this.openAnswerCard();
        }
    };

    prev() {
        if (this.qIndex !== 0) {
            this.qIndex--;
        }
    }
    ngOnInit() { }

    async openAnswerCard() {
        const modal = await this.modalCtrl.create({
            component: AnswerCardComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                title: this.title,
                from: "report",
                dataType: this.dataType,
                pid: this.pid,
                qcid: this.qcid,
                examId: this.examId,
            }
        });
        await modal.present();
        let acData = await modal.onDidDismiss();
        if (acData && acData.data && acData.data.qIndex) {
            this.qIndex = acData.data.qIndex - 1;
        }
    }
    getQueType(): string {
        if (this.questions.length > 0 && this.questions[this.qIndex].questionType === QuestionType.MUTI_ANSWER) {
            return '多选';
        }
        if (this.questions.length > 0 && this.questions[this.qIndex].questionType === QuestionType.ONE_ANSWER) {
            return '单选';
        }
        if (this.questions.length > 0 && this.questions[this.qIndex].questionType === QuestionType.TRUE_OR_FALSE) {
            return '判断';
        }
    }
}
