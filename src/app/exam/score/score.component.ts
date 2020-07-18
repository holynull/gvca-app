import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'app/model/question';
import { ExercisesService } from 'app/services/exercises.service';
import { SimulationService } from 'app/services/simulation.service';
import { ExamService } from 'app/services/exam.service';
import { AuthService } from 'app/services/auth.service';

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

    sumPeople: string;

    ranking: string;

    typeStr: string;

    url: string;

    constructor(
        private activeRoute: ActivatedRoute,
        public exerSvr: ExercisesService,
        public simuSvr: SimulationService,
        public examSvr: ExamService,
        public auth: AuthService,
    ) {
        this.activeRoute.queryParams.subscribe(params => {
            this.title = params.title;
            this.dataType = params.dataType;
            this.pid = params.pid;
            this.qcid = params.qcid;
            this.examId = params.examId;
            this.sumPeople = params.sumPeople;
            this.ranking = params.ranking;
            this.url = params.url;
            switch (this.dataType) {
                case 'exer':
                    this.questions = exerSvr.getQuestions(Number(this.pid), Number(this.qcid));
                    this.typeStr = '练习'
                    break;
                case 'simu':
                    this.questions = this.simuSvr.getQuestionsById(Number(this.examId));
                    this.typeStr = '模考';
                    break;
                case 'exam':
                    this.questions = this.examSvr.getQuestionsById(Number(this.examId));
                    this.typeStr = '考试';
                    break;
                case 'rand':
                    this.questions = this.simuSvr.randomTestPaper;
                    this.typeStr = '随机组卷';
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
