import { Platform } from '@ionic/angular';
import { ApiService } from 'app/services/api.service';
import { catchError, tap } from 'rxjs/operators';
import { DownloadTaskStatus } from './download-task-status';
import { Storage } from '@ionic/storage';
import { of, Observable } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { environment } from '@env/environment';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';

export class DownloadTask {
    api: ApiService;
    platform: Platform;
    fileSystem: File;
    transfer: FileTransferObject;
    taskId: string;
    total: number = 0;
    loaded: number = 0;
    nativeUrl: string;
    status: DownloadTaskStatus;
    speed: number = 0;
    checked: boolean = false;
    fileName: string;
    fullPath: string;
    targetUrl: string;
    lessonId: number;
    courseId: number;
    lessonState: string; // 下载页面显示用户观看状态
    lessonName: string;
    lessonLength: number;
    videosize: number;

    constructor(url: string, api: ApiService, platform: Platform, file: File, trans: FileTransfer) {
        this.targetUrl = url;
        this.api = api;
        this.platform = platform;
        this.fileSystem = file;
        this.transfer = trans.create();
    }

    private numToString(num) {
        if (Math.floor(num / 1024 / 1024 / 1024) > 0) {
            return Math.floor(num / 1024 / 1024 / 1024 * 10) / 10 + " GB";
        } else if (Math.floor(num / 1024 / 1024) > 0) {
            return Math.floor(num / 1024 / 1024 * 10) / 10 + " MB";
        } else if (Math.floor(num / 1024) > 0) {
            return Math.floor(num / 1024 * 10) / 10 + " KB";
        } else {
            return num + " B";
        }
    }

    totalToString() {
        return this.numToString(this.total);
    }

    loadedToString() {
        return this.numToString(this.loaded);
    }

    speedToString() {
        return this.numToString(this.speed);
    }

    run(updateStorageCallBack: Function) {
        this.status = DownloadTaskStatus.Downloading;
        let sta = new Date().getTime();
        let preLoaded = 0;
        let root = this.fileSystem.dataDirectory;
        let rFileName;
        if (this.fileName) {
            rFileName = environment.videoDir + '/' + this.fileName;
            this.fileSystem.checkFile(root, rFileName).then(exists => {
                if (exists) {// 文件存在，续传

                }
            }).catch(e => {
                if (e.code === 1) { // 不存在

                }
                console.error(e, {});
            });
        } else {
            this.fileName = 'file_' + new Date().getTime() + '.mp4';
            rFileName = environment.videoDir + '/' + this.fileName;
        }
        const opt = {
            headers: {

            }
        }

        this.transfer.onProgress(event => {
            // console.log(event);
            if (event.lengthComputable) {
                let now = new Date().getTime();
                if (now - sta >= 1000) {
                    this.speed = event.loaded - preLoaded;
                    preLoaded = event.loaded;
                    sta = now;
                    this.loaded = event.loaded;
                    this.total = event.total;
                }
            }
        });
        this.status = DownloadTaskStatus.Downloading;
        this.transfer.download(this.targetUrl, root + '/' + rFileName, true, opt).then(event => {
            console.log(event);
            this.status = DownloadTaskStatus.Done;
            this.loaded = this.total;
            this.nativeUrl = event.nativeURL;
            this.fullPath = event.fullPath;
            updateStorageCallBack();
        }).catch(e => {
            console.error(e, {});
            this.status = DownloadTaskStatus.Failed;
            updateStorageCallBack();
        });
        // return this.api.testDownload(this.url).pipe(catchError(e => {
        //     console.error(e);
        //     this.status = DownloadTaskStatus.Failed;
        //     updateStorageCallBack();
        //     return of(e);
        // }), tap(res => {
        //     if (res.type === HttpEventType.Sent) {
        //         this.status = DownloadTaskStatus.Downloading;
        //         updateStorageCallBack();
        //     }
        //     if (res.type === HttpEventType.DownloadProgress) {
        //         let now = new Date().getTime();
        //         if (now - sta >= 1000) {
        //             this.speed = res.loaded - preLoaded;
        //             preLoaded = res.loaded;
        //             sta = now;
        //         }
        //         this.loaded = res.loaded;
        //         this.total = res.total;
        //     }
        //     if (res.type === HttpEventType.Response) {
        //         this.status = DownloadTaskStatus.Done;
        //         let fileName = 'file_' + new Date().getTime() + '.mp4';
        //         this.fileName = fileName;
        //         if (this.platform.is('cordova')) {
        //             let root = this.fileSystem.dataDirectory;
        //             let rFileName = environment.videoDir + '/' + fileName;
        //             if (this.platform.is('ios')) {
        //                 root = this.fileSystem.documentsDirectory;
        //             }
        //             if (this.platform.is('android')) {
        //                 rFileName = 'Documents/' + rFileName;
        //             }
        //             this.fileSystem.writeFile(root, rFileName, res.body, { replace: true }).then(saveRes => {
        //                 console.log(saveRes);
        //                 this.nativeUrl = saveRes.nativeURL;
        //                 this.fullPath = saveRes.fullPath;
        //                 updateStorageCallBack();
        //             }).catch(e => {
        //                 console.error(e, {});
        //             });
        //         } else {
        //             updateStorageCallBack();
        //         }
        //     }
        // }));
    }
    getLearnState() {
            let r = 0;
            if (this.videosize && this.lessonLength && this.videosize !== 0) {
                r = Math.floor(this.lessonLength / this.videosize * 100);
            }
            if (r === 0) {
                return '未观看'
            } else {
                return '观看至' + r + '%';
            }
    }
}