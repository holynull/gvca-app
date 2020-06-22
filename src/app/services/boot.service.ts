import { Injectable } from '@angular/core';
import { AdvService } from './adv.service';
import { CourseDownloadService } from './course-download.service';
import { CourseService } from './course.service';
import { NoticeService } from './notice.service';
import { Platform } from '@ionic/angular';
import { ExercisesService } from './exercises.service';

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
        });
    }
}
