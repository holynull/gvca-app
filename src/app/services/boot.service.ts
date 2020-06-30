import { Injectable } from '@angular/core';
import { AdvService } from './adv.service';
import { CourseDownloadService } from './course-download.service';
import { CourseService } from './course.service';
import { NoticeService } from './notice.service';
import { Platform } from '@ionic/angular';
import { ExercisesService } from './exercises.service';
import { SimulationService } from './simulation.service';
import { ExamService } from './exam.service';
import { AttendService } from './attend.service';

@Injectable({
    providedIn: 'root'
})
export class BootService {

    constructor(
        private platform: Platform,
        private advSrv: AdvService,
        private noticeSvr: NoticeService,
        private courseSvr: CourseService,
        private courseDownloadSvr: CourseDownloadService,
        private exercisSvr: ExercisesService,
        private simuSvr: SimulationService,
        private examSvr: ExamService,
        private attendSvr: AttendService,
    ) {
        this.initData();
    }

    initData() {
        this.platform.ready().then(() => {
            this.advSrv.initData();
            this.noticeSvr.loadeData();
            this.courseSvr.getAllCourseCats();
            this.courseDownloadSvr.initData();
            this.exercisSvr.loadData();
            this.simuSvr.loadData();
            this.examSvr.loadData();
            this.attendSvr.loadData();
        });
    }
}
