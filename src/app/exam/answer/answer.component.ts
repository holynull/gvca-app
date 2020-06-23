import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, GestureController } from '@ionic/angular';
import { AnswerCardComponent } from '../answer-card/answer-card.component';
import { interval } from 'rxjs';
import { createGesture, Gesture } from '@ionic/core';
import { ExercisesService } from 'app/services/exercises.service';
import { Question } from 'app/model/question';
import { QuestionOption } from 'app/model/que-option';
import { QuestionType } from 'app/model/question-type.enum';
import { SimulationService } from 'app/services/simulation.service';
import { ExamService } from 'app/services/exam.service';

@Component({
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {

    @ViewChild('content', {})
    ionContent: ElementRef;

    url: string = '/tabs/exam';

    qIndex: number = 0;

    title: string;
    // 倒计时总秒数
    seconds = 60 * 90;

    h: string = '00'; // 倒计时小时
    m: string = '00'; // 倒计时分钟
    s: string = '00'; // 倒计时秒

    slideFromRight: Gesture;

    questions: Array<Question> = new Array();

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
            if (params && params.title) {
                this.title = params.title;
            }
            switch (params.from) {
                case 'exer':
                    if (params.qid && params.qcid) {
                        this.questions = eSvr.getQuestions(Number(params.pid), Number(params.qcid));
                    }
                    this.url = '/tabs/exam';
                    break;
                case 'simu':
                    if (params.examId) {
                        this.questions = this.sSvr.getQuesionsById(Number(params.examId));
                    }
                    this.url = '/tabs/exam/simulation'
                    break;
                case 'exam':
                    if (params.examId) {
                        this.questions = this.examSvr.getQuesionsById(Number(params.examId));
                    }
                    this.url = '/tabs/exam/examine'
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
        }
        console.log('下一题');
    };

    prev() {
        console.log('上一题');
        if (this.qIndex !== 0) {
            this.qIndex--;
        }
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

    ionViewWillLeave() {
        this.eSvr.saveOrUpdate(false);
        this.examSvr.saveOrUpdate(false);
        this.sSvr.saveOrUpdate(false);
    }

}
