import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercisesService } from 'app/services/exercises.service';
import { ExamService } from 'app/services/exam.service';
import { SimulationService } from 'app/services/simulation.service';
import { ExercisCourseDetail } from 'app/model/exercis-course-detail';
import { TestPaper } from 'app/model/test-paper';
import { UsedState } from 'app/model/used-state.enum';

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {

    curTab = 1;

    constructor(
        private activedRoute: ActivatedRoute,
        private router: Router,
        public exerSvr: ExercisesService,
        public examSvr: ExamService,
        public simuSvr: SimulationService,
    ) {
        activedRoute.queryParams.subscribe(params => {
            if (params.tab) {
                this.curTab = Number(params.tab);
            }
        });
    }

    ngOnInit() { }

    changeTab(tab) {
        this.curTab = tab;
    }
    toReport(title) {
        this.router.navigate(['/exam/report'], { queryParams: { title: title, url: '/exam/records' } });
    }

    goToAnswerExer(detail: ExercisCourseDetail) {
        if (detail.questions.length > 0) {
            this.router.navigate(['/exam/answer'], { queryParams: { title: detail.name, pid: detail.pid, qcid: detail.qcid, dataType: 'exer', url: '/exam/records' } });
        }
    }
    goToAnswer(detail: TestPaper, dataType: string) {
        if (detail.questions.length > 0 && detail.usedState === UsedState.DONE) {
            this.router.navigate(['/exam/report'], { queryParams: { title: detail.examName, examId: detail.examId, dataType: dataType, url: '/exam/records', tab: this.curTab } });
        } else if (detail.questions.length > 0 && detail.usedState === UsedState.NONE) {
            this.router.navigate(['/exam/answer'], { queryParams: { title: detail.examName, examId: detail.examId, dataType: dataType, url: '/exam/records', tab: this.curTab } });
        }
    }
}
