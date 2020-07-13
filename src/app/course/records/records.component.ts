import { Component, OnInit } from '@angular/core';
import { CourseService } from 'app/services/course.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

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

    play(videoUrl: string) {
        if (!this.editable) {
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
            this.media.playVideo(videoUrl, options);
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
