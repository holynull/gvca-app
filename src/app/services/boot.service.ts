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
import { HomeworkService } from './homework.service';
import { CourseInfo } from 'app/model/course-info';

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
        private exerSvr: ExercisesService,
        private simuSvr: SimulationService,
        private examSvr: ExamService,
        private attendSvr: AttendService,
        private hwSvr: HomeworkService,
    ) {
        this.initData();
    }

    initData() {
        this.platform.ready().then(() => {
            this.advSrv.initData();
            this.noticeSvr.loadeData();
            this.courseSvr.getAllCourseCats();
            this.courseSvr.loadLessonRecords().then();
            this.courseDownloadSvr.initData();
            this.exerSvr.loadData();
            this.simuSvr.loadData();
            this.examSvr.loadData();
            this.attendSvr.loadData().then();
            this.hwSvr.loadCompletedHomeWork().then();
            this.exerSvr.getStateData().then();
            this.simuSvr.getStateData().then();
            this.examSvr.getStateData().then();
        });
    }

    clearData(){
        this.advSrv.advs=new Array();
        this.noticeSvr.noticeCats=new Array();
        this.courseSvr.courseCats=new Array();
        this.courseSvr.courses=new Array();
        this.courseSvr.info=new CourseInfo();
        this.courseSvr.records=new Array();
        this.courseDownloadSvr.tasks=new Array();
        this.exerSvr.exercisCourses=new Array();
        this.exerSvr.stateData={
            rightStr: '',
            leftStr: ' / ',
            middleStr: '',
        };
        this.simuSvr.disableMsg='';
        this.simuSvr.enabled=true;
        this.simuSvr.randomTestPaper=new Array();
        this.simuSvr.stateData={
            rightStr: '',
            leftStr: ' / ',
            middleStr: '',
        };
        this.examSvr.testPapers=new Array();
        this.examSvr.disableMsg='';
        this.examSvr.enabled=true;
        this.examSvr.stateData={
            rightStr: '',
            leftStr: ' / ',
            middleStr: '',
        };
        this.examSvr.testPapers=new Array();
    }
}
