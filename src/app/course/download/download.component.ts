import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Platform } from '@ionic/angular';
import { DownloadTask } from 'app/model/download-task';
import { DownloadTaskStatus } from 'app/model/download-task-status';
import { CourseDownloadService } from 'app/services/course-download.service';
import { interval, Subscription } from 'rxjs';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Lesson } from 'app/model/lesson';
import { CourseService } from 'app/services/course.service';

@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {

    editable: boolean = false;

    curTab: number = 1;

    freeSpace: string = '0 B';

    checkedIds: Array<string> = new Array();

    checkList: Array<boolean> = new Array();

    timer: Subscription;

    url: string = '';

    backParams: any = {};

    constructor(
        public platform: Platform,
        private file: File,
        public courseDownloadSvr: CourseDownloadService,
        private router: Router,
        private media: StreamingMedia,
        private activedRoute: ActivatedRoute,
        private webview: WebView,
        private courseSvr: CourseService,
    ) {
        if (platform.is('cordova')) {
            file.getFreeDiskSpace().then(num => {
                if (Math.floor(num / 1024 / 1024 / 1024) > 0) {
                    this.freeSpace = Math.floor(num / 1024 / 1024 / 1024 * 10) / 10 + " GB";
                } else if (Math.floor(num / 1024 / 1024) > 0) {
                    this.freeSpace = Math.floor(num / 1024 / 1024 * 10) / 10 + " MB";
                } else if (Math.floor(num / 1024) > 0) {
                    this.freeSpace = Math.floor(num / 1024 * 10) / 10 + " KB";
                } else {
                    this.freeSpace = num + " B";
                }
            });
        }
        this.activedRoute.queryParams.subscribe(params => {
            if (params.url) {
                this.url = params.url;
            } else {
                this.url = '/tabs/mine';
            }
            if (params.tab) {
                this.curTab = Number(params.tab);
            }

            if (params.courseId) {
                this.backParams.id = params.courseId;
            }
        });
    }

    ngOnInit() {
        this.courseDownloadSvr.tasks.forEach(t => {
            this.getLearnState(t);
        })
    }

    changeEditStatus() {
        if (this.editable) {
            this.editable = false;
        } else {
            this.editable = true;
            this.courseDownloadSvr.tasks.forEach(e => {
                this.checkList.push(false);
            });
        }
    }

    changeTab(tab) {
        this.curTab = tab;
        if (this.curTab === 2) {
            if (this.platform.is('cordova')) {
                this.file.getFreeDiskSpace().then(num => {
                    if (Math.floor(num / 1024 / 1024 / 1024) > 0) {
                        this.freeSpace = Math.floor(num / 1024 / 1024 / 1024 * 10) / 10 + " GB";
                    } else if (Math.floor(num / 1024 / 1024) > 0) {
                        this.freeSpace = Math.floor(num / 1024 / 1024 * 10) / 10 + " MB";
                    } else if (Math.floor(num / 1024) > 0) {
                        this.freeSpace = Math.floor(num / 1024 * 10) / 10 + " KB";
                    } else {
                        this.freeSpace = num + " B";
                    }
                });
            }
        }
    }

    delete(status: DownloadTaskStatus) {
        this.courseDownloadSvr.delTask(status);
    }

    selectAll() {
        if (!this.courseDownloadSvr.tasks.every(e => e.checked)) {
            this.courseDownloadSvr.tasks.forEach(e => {
                e.checked = true;
            });
        } else {
            this.courseDownloadSvr.tasks.forEach(e => {
                e.checked = false;
            });
        }

    }

    playVideo(task: DownloadTask) {
        console.log(task);
        let url = task.nativeUrl;
        console.log(url);
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
        this.media.playVideo(url, options);
        // let url = this.webview.convertFileSrc(task.nativeUrl);
        // this.router.navigate(['/course/play-lesson'], { queryParams: { url: url, courseId: task.courseId, lessonId: task.lessonId } });
    }

    reDownload(item: DownloadTask) {
        item.run(() => {
            this.courseDownloadSvr.updateStorage();
        });
    }

    ionViewDidEnter(event) {
        this.timer = interval(1000).subscribe(s => {

        });
    }

    ionViewWillLeave(event) {
        this.timer.unsubscribe();
    }

    async getLearnState(item: DownloadTask) {
        let lesson: Lesson = await this.courseSvr.getLessonById(item.courseId, item.lessonId);
        if (lesson) {
            let r = 0;
            if (lesson.videosize && lesson.lessonLength && lesson.videosize !== 0) {
                r = Math.floor(lesson.lessonLength / lesson.videosize * 100);
            }
            if (r === 0) {
                item.lessonState = '未观看'
            } else {
                item.lessonState = '观看至' + r + '%';
            }
        }
    }
}
