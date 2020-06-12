import { Component, OnInit, ViewChild } from '@angular/core';
import { VgMedia, BitrateOption } from 'videogular2/compiled/core';
import { CourseDownloadService } from 'app/services/course-download.service';
import { Router, ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    curTab = 1;

    constructor(public courseDownloadSvr: CourseDownloadService, private router: Router, private activedRoute: ActivatedRoute, private file: File) {
        this.activedRoute.queryParams.subscribe(params => {
            if (params && params.taskId) {
                this.file.resolveLocalFilesystemUrl(this.courseDownloadSvr.getTaskById(params.taskId).nativeUrl).then(entry => {
                    this.videoPath = entry.toInternalURL();
                }).catch(e => {
                    console.error(e);
                });
            } else {
                this.videoPath = "https://images.plo.one/video/videogular.mp4";
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
