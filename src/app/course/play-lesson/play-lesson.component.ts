import { Component, OnInit, ViewChild } from '@angular/core';
import { VgMedia, VgAPI, BitrateOption } from 'videogular2/compiled/core';
import { ActivatedRoute } from '@angular/router';

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

    constructor(
        private activedRoute: ActivatedRoute,
    ) {
        this.activedRoute.queryParams.subscribe(params => {
            this.videoUrl = params.url;
        })
    }

    playerReady(event) {
        this.vgApi = event;
        this.vgApi.getDefaultMedia().subscriptions.error.subscribe(
            (error) => { console.log(error); }
        );
        // this.vgApi.getDefaultMedia().currentTime = this.curLesson.lessonLength;
        let sta = new Date();
        this.vgApi.getDefaultMedia().subscriptions.playing.subscribe(() => {
            let gapTime = Math.floor((new Date().getTime() - sta.getTime()) / 1000);
            // this.courseSvr.updateLessonStuData(this.curLesson, gapTime, this.vgApi.getDefaultMedia().currentTime);
            sta = new Date();
        });
        this.vgApi.getDefaultMedia().subscriptions.pause.subscribe(() => {
            let gapTime = Math.floor((new Date().getTime() - sta.getTime()) / 1000);
            // this.courseSvr.updateLessonStuData(this.curLesson, gapTime, this.vgApi.getDefaultMedia().currentTime);
            sta = new Date();
        });
        this.vgApi.getDefaultMedia().subscriptions.timeUpdate.subscribe((event) => { // 不允许快进
            // if ((this.vgApi.getDefaultMedia().currentTime >= 2 && this.vgApi.getDefaultMedia().currentTime - this.curLesson.lessonLength) > 2) {
            //     this.vgApi.getDefaultMedia().currentTime = this.curLesson.lessonLength;
            // } else {
            //     this.curLesson.lessonLength = this.vgApi.getDefaultMedia().currentTime;
            // }
        });
    }
    ngOnInit() { }

}
