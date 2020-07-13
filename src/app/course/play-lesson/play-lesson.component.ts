import { Component, OnInit, ViewChild } from '@angular/core';
import { VgMedia, VgAPI, BitrateOption } from 'videogular2/compiled/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'app/services/course.service';
import { Lesson } from 'app/model/lesson';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Course } from 'app/model/course';

@Component({
    selector: 'app-play-lesson',
    templateUrl: './play-lesson.component.html',
    styleUrls: ['./play-lesson.component.scss'],
})
export class PlayLessonComponent implements OnInit {
    @ViewChild('myMedia', {})
    myMedia: VgMedia;

    vgApi: VgAPI;
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

    videoUrl: string;

    courseId: number;

    lessonId: number;

    lesson: Lesson;

    course: Course;

    screen: string;

    url: string;

    constructor(
        private activedRoute: ActivatedRoute,
        private courseSvr: CourseService,
        private webview: WebView,
    ) {
        this.activedRoute.queryParams.subscribe(params => {
            this.courseId = Number(params.courseId);
            this.course = this.courseSvr.getCourse(Number(this.courseId));
            this.lessonId = Number(params.lessonId);
            this.videoUrl = params.videoUrl;
            this.screen = params.screen;
            this.url = params.url;
            if (this.courseId && this.lessonId) {
                this.courseSvr.getLessonById(this.courseId, this.lessonId).then(lesson => {
                    this.lesson = lesson;
                    this.videoUrl = params.url;
                    this.initPlayer();
                });
            }
        });
    }

    initPlayer() {
        this.vgApi.getDefaultMedia().subscriptions.error.subscribe(
            (error) => { console.log(error); }
        );
        this.vgApi.getDefaultMedia().currentTime = this.lesson.lessonLength;
        let sta = new Date();
        this.vgApi.getDefaultMedia().subscriptions.playing.subscribe(() => {
            let gapTime = Math.floor((new Date().getTime() - sta.getTime()) / 1000);
            this.courseSvr.updateLessonStuData(this.lesson, gapTime, this.vgApi.getDefaultMedia().currentTime);
            sta = new Date();
        });
        this.vgApi.getDefaultMedia().subscriptions.pause.subscribe(() => {
            let gapTime = Math.floor((new Date().getTime() - sta.getTime()) / 1000);
            this.courseSvr.updateLessonStuData(this.lesson, gapTime, this.vgApi.getDefaultMedia().currentTime);
            sta = new Date();
        });
        this.vgApi.getDefaultMedia().subscriptions.timeUpdate.subscribe((event) => { // 不允许快进
            if ((this.vgApi.getDefaultMedia().currentTime >= 2 && this.vgApi.getDefaultMedia().currentTime - this.lesson.lessonLength) > 2) {
                this.vgApi.getDefaultMedia().currentTime = this.lesson.lessonLength;
            } else {
                this.lesson.lessonLength = this.vgApi.getDefaultMedia().currentTime;
            }
        });
    }

    playerReady(event) {
        this.vgApi = event;
    }

    ngOnInit() { }

    onVideoError(event) {
        console.error('播放出错', event);
    }
}
