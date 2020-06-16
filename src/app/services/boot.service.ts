import { Injectable } from '@angular/core';
import { AdvService } from './adv.service';
import { NoticeService } from './notice.service';
import { Storage } from '@ionic/storage';
import { ConstVal } from 'app/constVal';
import { Adv } from 'app/model/adv';
import { CourseService } from './course.service';
import { CourseDownloadService } from './course-download.service';

@Injectable({
    providedIn: 'root'
})
export class BootService {

    constructor(
        private storage: Storage,
        private advSrv: AdvService,
        private noticeSvr: NoticeService,
        private courseSvr: CourseService,
        private courseDownloadSvr: CourseDownloadService,
    ) {
        this.initData();
    }

    initData() {
        this.advSrv.initData();
        this.noticeSvr.loadeData();
        this.courseSvr.getAllCourseCats();
        this.courseDownloadSvr.initData();
    }
}
