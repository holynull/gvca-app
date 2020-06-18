import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { VgMedia, BitrateOption, VgAPI, VgControlsHidden } from 'videogular2/compiled/core';
import { CourseDownloadService } from 'app/services/course-download.service';
import { Router, ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { Course } from 'app/model/course';
import { CourseService } from 'app/services/course.service';
import { Lesson } from 'app/model/lesson';
import { PageInfo } from 'app/model/pageInfo';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    curTab = 1;

    tab: number;

    course: Course = new Course();

    @ViewChild('myMedia', {})
    myMedia: VgMedia;

    vgApi: VgAPI;
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

    pageInfo: PageInfo = new PageInfo();

    constructor(
        public courseDownloadSvr: CourseDownloadService,
        private router: Router,
        private activedRoute: ActivatedRoute,
        public courseSvr: CourseService,
        private vgCtrlHidden: VgControlsHidden,
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
    playerReady(event) {
        this.vgApi = event;

    }
    ngOnInit() {
        // this.dashBitrates.push(this.videoQuality1, this.videoQuality2);
        // if (this.course.lessons && this.course.lessons.length > 0) {
        //     this.videoPath = this.course.lessons[0].videoUrl;
        // } else {
        //     this.videoPath = 'http://static.videogular.com/assets/videos/videogular.mp4';//this.lessons[0].videoUrl;
        // }
    }

    ionViewWillEnter() {

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

    doRefresh(event) {
        this.pageInfo.firstPage();
        this.courseSvr.getLesson(this.pageInfo, this.course.courseId, (arr) => {
            this.course.lessons = arr;
            event.target.complete();
            if (this.course.lessons && this.course.lessons.length > 0) {
                this.videoPath = this.course.lessons[0].videoUrl;
            }
        });
    }

    loadData(event) {
        this.pageInfo.nextPage();
        this.courseSvr.getLesson(this.pageInfo, this.course.courseId, (arr) => {
            arr.forEach(e => {
                this.course.lessons.push(e);
            });
            event.target.complete();
        });
    }

    play(id) {
        // this.router.navigate(['/course/detail'], { queryParams: { id: this.course.courseId, tab: this.tab, lid: id } });
        // if (params.lid) {
        //                 this.course.lessons.forEach(e => {
        //                     if (e.lessonId === params.lid) {
        // this.videoPath = e.videoUrl;
        this.vgApi.pause();
        this.vgApi.getMediaById('v_' + id).play();
        this.vgCtrlHidden.state(true);
        //         }
        //     });
        // }
    }
}
