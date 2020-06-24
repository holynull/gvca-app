import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'app/model/question';
import { ExercisesService } from 'app/services/exercises.service';
import { SimulationService } from 'app/services/simulation.service';
import { ExamService } from 'app/services/exam.service';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {

    title: string;

    dataType: string;

    questions: Array<Question> = new Array();

    pid: number;

    qcid: number;

    examId: number;

    constructor(
        private activeRoute: ActivatedRoute,
        public exerSvr: ExercisesService,
        public simuSvr: SimulationService,
        public examSvr: ExamService,
    ) {
        this.activeRoute.queryParams.subscribe(params => {
            this.title = params.title;
            this.dataType = params.dataType;
            this.pid = params.pid;
            this.qcid = params.qcid;
            this.examId = params.examId;
            switch (this.dataType) {
                case 'exer':
                    this.questions = exerSvr.getQuestions(Number(this.pid), Number(this.qcid));
                    break;
                case 'simu':
                    this.questions = this.simuSvr.getQuestionsById(Number(this.examId));
                    break;
                case 'exam':
                    this.questions = this.examSvr.getQuestionsById(Number(this.examId));
                    break;
            }
        });
    }

    ngOnInit() { }

    getScore() {
        let total = 0;
        this.questions.forEach(e => {
            total = total + e.getQuestionScore();
        });
        return total;
    }
    getTotalScore() {
        let total = 0;
        this.questions.forEach(e => {
            total = total + e.score;
        });
        return total;
    }
}
