import { Component, OnInit, ViewChild } from '@angular/core';
import { VgMedia, BitrateOption } from 'videogular2/compiled/core';
import { CourseDownloadService } from 'app/services/course-download.service';
import { Router, ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { Course } from 'app/model/course';
import { CourseService } from 'app/services/course.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    curTab = 1;

    tab: number;

    course: Course = new Course();

    constructor(
        public courseDownloadSvr: CourseDownloadService,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private file: File,
        public courseSvr: CourseService,
    ) {
        this.activedRoute.queryParams.subscribe(params => {
            if (params.id) {
                this.course = this.courseSvr.getCourse(Number(params.id));
            }
            if (params.tab) {
                this.tab = Number(params.tab);
            }
        });
    }
    @ViewChild('myMedia') myMedia: VgMedia;
    videoPath: string;
    videoQuality1: BitrateOption = {
        qualityIndex: 720,
        width: 500,
        height: 300,
        bitrate: 1,
        mediaType: "video/mp4",
        label: "高清",
    };
    videoQuality2: BitrateOption = {
        qualityIndex: 960,
        width: 500,
        height: 300,
        bitrate: 1,
        mediaType: "video/mp4",
        label: "超清",
    };
    dashBitrates: Array<BitrateOption> = [];

    ngOnInit() {
        // this.dashBitrates.push(this.videoQuality1, this.videoQuality2);
    }

    ionViewDidLeave() {
        this.course = null;
    }

    selectTab(tab) {
        this.curTab = tab;
    }

    download() {
        this.router.navigate(['/course/download']);
        this.courseDownloadSvr.runTask();
        setTimeout(() => {
            this.courseDownloadSvr.runTask();
        }, 1000);
        setTimeout(() => {
            this.courseDownloadSvr.runTask();
        }, 1000);
    }
}
