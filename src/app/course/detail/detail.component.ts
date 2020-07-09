import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/model/course';
import { Lesson } from 'app/model/lesson';
import { PageInfo } from 'app/model/pageInfo';
import { CourseDownloadService } from 'app/services/course-download.service';
import { CourseService } from 'app/services/course.service';
import { BitrateOption, VgAPI, VgMedia } from 'videogular2/compiled/core';
import { AlertController } from '@ionic/angular';
import { interval } from 'rxjs';
import { last } from 'rxjs/operators';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { DownloadTask } from 'app/model/download-task';

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

    curLesson: Lesson;

    constructor(
        public courseDownloadSvr: CourseDownloadService,
        private router: Router,
        private activedRoute: ActivatedRoute,
        public courseSvr: CourseService,
        private alertCtrl: AlertController,
        private media: StreamingMedia,
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
        this.vgApi.getDefaultMedia().currentTime = this.curLesson.lessonLength;
        let sta = new Date();
        this.vgApi.getDefaultMedia().subscriptions.playing.subscribe(() => {
            let gapTime = Math.floor((new Date().getTime() - sta.getTime()) / 1000);
            this.courseSvr.updateLessonStuData(this.curLesson, gapTime, this.vgApi.getDefaultMedia().currentTime);
            sta = new Date();
        });
        this.vgApi.getDefaultMedia().subscriptions.pause.subscribe(() => {
            let gapTime = Math.floor((new Date().getTime() - sta.getTime()) / 1000);
            this.courseSvr.updateLessonStuData(this.curLesson, gapTime, this.vgApi.getDefaultMedia().currentTime);
            sta = new Date();
        });
        this.vgApi.getDefaultMedia().subscriptions.timeUpdate.subscribe((event) => { // 不允许快进
            if ((this.vgApi.getDefaultMedia().currentTime >= 2 && this.vgApi.getDefaultMedia().currentTime - this.curLesson.lessonLength) > 2) {
                this.vgApi.getDefaultMedia().currentTime = this.curLesson.lessonLength;
            } else {
                this.curLesson.lessonLength = this.vgApi.getDefaultMedia().currentTime;
            }
        });
    }
    ngOnInit() {
        if (this.course.lessons && this.course.lessons.length > 0) {
            this.curLesson = this.course.lessons[0];
        }
    }

    ionViewWillLeave() {
        console.log({
            curTime: this.vgApi.getDefaultMedia().currentTime,
        });
    }

    ionViewDidLeave() {
        this.course = null;
    }

    selectTab(tab) {
        this.curTab = tab;
    }

    downloadAll() {
        this.router.navigate(['/course/download'], {
            queryParams: {
                url: '/course/detail',
                courseId: this.course.courseId,
            }
        });
        this.course.lessons.forEach(e => {
            this.download(e);
        });
    }

    download(item: Lesson) {
        this.courseDownloadSvr.runTask(item);
    }

    doRefresh(event) {
        this.pageInfo.firstPage();
        this.courseSvr.getLesson(this.pageInfo, this.course.courseId, (arr) => {
            this.course.lessons = arr;
            event.target.complete();
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

    play(lesson: Lesson) {
        let task = this.isDownloaded(lesson)
        if (!task) {
            this.vgApi.pause();
            this.curLesson = lesson;
            this.vgApi.getDefaultMedia().currentTime = this.curLesson.lessonLength;
            this.vgApi.play();
        } else {
            let options: StreamingVideoOptions = {
                successCallback: () => {
                    console.log('Video played');
                },
                errorCallback: (e) => {
                    console.log(e, {});
                },
                orientation: 'landscape',
                shouldAutoClose: true,
                controls: true,
            };
            // todo: 本地播放，无法实现上传播放时长
            this.media.playVideo(task.nativeUrl, options);
        }
    }
    async onVideoError(event) {
        console.error("视频onVideoError", event);
        // let alert = await this.alertCtrl.create({
        //     header: "温馨提示",
        //     message: "您所请求的视频不存在。",
        //     backdropDismiss: false,
        //     buttons: [
        //         {
        //             text: "确定",
        //             role: 'cancel',
        //             cssClass: 'secondary',
        //             handler: (blah) => {
        //                 // console.log('Confirm Cancel: blah');
        //             }
        //         }
        //     ]
        // });
        // await alert.present();
    }

    isDownloaded(lesson: Lesson): DownloadTask {
        for (let i = 0; i < this.courseDownloadSvr.tasks.length; i++) {
            if (this.courseDownloadSvr.tasks[i].lessonId === lesson.lessonId) {
                return this.courseDownloadSvr.tasks[i];
            }
        }
        return null;
    }
}
