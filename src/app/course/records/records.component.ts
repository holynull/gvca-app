import { Component, OnInit } from '@angular/core';
import { CourseService } from 'app/services/course.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { CourseDownloadService } from 'app/services/course-download.service';
import { Lesson } from 'app/model/lesson';

@Component({
    selector: 'app-course-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {

    editable: boolean = false;

    curTab: number = 1;
    constructor(
        public courseSvr: CourseService,
        private media: StreamingMedia,
        public courseDownloadSvr: CourseDownloadService,
    ) { }

    ngOnInit() { }

    changeEditStatus() {
        if (this.editable) {
            this.editable = false;
        } else {
            this.editable = true;
        }
    }

    changeTab(tab) {
        this.curTab = tab;
    }

    getLongStr(l: number) {
        l = l ? l : 0;
        l = Math.floor(l);
        if (l < 60) {
            return l + '秒';
        }
        let str = '';
        let m = Math.floor(l / 60);
        if (m > 0) {
            str = m + '分';
        }
        let s = l % 60;
        str = str + s + '秒';
        return str;
    }

    play(item:any) {
        if (!this.editable) {
            let options: StreamingVideoOptions = {
                successCallback: (data) => {
                    console.log('Video played');
                    if (data) {
                        let d: string[] = data.split(',');
                        item.videosize = Number(d[1]);
                        item.lessonLength = Number(d[0]);
                        this.courseDownloadSvr.updateStorage();
                    }
                },
                errorCallback: (e) => {
                    console.log(e, {});
                },
                orientation: item.lessonLength+'',
                shouldAutoClose: true,
                controls: true,
            };
            // 已观看时长 item.lessonLength 在线离线都有这个字段
            // todo: 本地播放，无法实现上传播放时长
            let url=item.nativeUrl?item.nativeUrl:item.videoUrl;
            this.media.playVideo(url, options);
        }
    }

    selectAll() {
        if (!this.courseSvr.records.every(e => e.checked)) {
            this.courseSvr.records.forEach(e => {
                e.checked = true;
            });
        } else {
            this.courseSvr.records.forEach(e => {
                e.checked = false;
            });
        }
    }

    del() {
        this.courseSvr.records = this.courseSvr.records.filter(e => !e.checked);
    }

}
