import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Platform } from '@ionic/angular';
import { DownloadTask } from 'app/model/download-task';
import { DownloadTaskStatus } from 'app/model/download-task-status';
import { CourseDownloadService } from 'app/services/course-download.service';

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

    constructor(public platform: Platform, private file: File, public courseDownloadSvr: CourseDownloadService, private router: Router, private media: StreamingMedia) {
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

    }

    ngOnInit() { }

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
        this.media.playVideo(url, options);
    }
    reDownload(item: DownloadTask) {
        item.download(() => {
            this.courseDownloadSvr.updateStorage();
        }).subscribe(d => {

        });
    }

}
