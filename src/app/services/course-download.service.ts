import { HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { ConstVal } from 'app/constVal';
import { DownloadTask } from 'app/model/download-task';
import { DownloadTaskStatus } from 'app/model/download-task-status';
import { tap, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { BaseService } from './base.service';
import { Platform } from '@ionic/angular';
import { of } from 'rxjs';
import { DownloadTaskStorage } from 'app/model/download-task-storage';





@Injectable({
    providedIn: 'root'
})
export class CourseDownloadService extends BaseService {

    tasks: Array<DownloadTask> = new Array();

    constructor(private api: ApiService, private file: File, private storage: Storage, private platform: Platform) {
        super();
        this.storage.get(ConstVal.DOWNLOAD_TASKS).then(data => {
            if (data) {
                data.forEach((d, index, arr) => {
                    let task = new DownloadTask();
                    task.taskId = d.taskId;
                    task.total = Number(d.total);
                    task.loaded = Number(d.loaded);
                    task.nativeUrl = d.nativeUrl;
                    task.status = Number(d.status);
                    task.speed = Number(d.speed);
                    task.fileName = d.fileName;
                    this.tasks.push(task);
                });
            }
        });
    }

    downloadFile(): DownloadTask {
        let task = new DownloadTask();
        task.taskId = String(new Date().getTime());
        let sta = new Date().getTime();
        let preLoaded = 0;
        task.observable = this.api.testDownload().pipe(catchError(e => {
            console.error(e);
            task.status = DownloadTaskStatus.Failed;
            this.updateStorage();
            return of(e);
        }), tap(res => {
            if (res.type === HttpEventType.Sent) {
                task.status = DownloadTaskStatus.Downloading;
                this.updateStorage();
            }
            if (res.type === HttpEventType.DownloadProgress) {
                let now = new Date().getTime();
                if (now - sta >= 1000) {
                    task.speed = res.loaded - preLoaded;
                    preLoaded = res.loaded;
                    sta = now;
                }
                task.loaded = res.loaded;
                task.total = res.total;
            }
            if (res.type === HttpEventType.Response) {
                task.status = DownloadTaskStatus.Done;
                let fileName = 'file_' + new Date().getTime() + '.mp4';
                task.fileName = fileName;
                if (this.platform.is('cordova')) {
                    this.file.writeFile(this.file.dataDirectory, fileName, res.body, { replace: true }).then(saveRes => {
                        task.nativeUrl = saveRes.nativeURL;
                        this.updateStorage();
                    });
                } else {
                    let arr = new Array();
                    this.tasks.forEach(e => {
                        arr.push(new DownloadTaskStorage(e));
                    });
                    this.updateStorage();
                }
            }
        }));
        this.tasks.push(task);
        this.updateStorage();
        return task;
    }

    private updateStorage() {
        let arr = new Array();
        this.tasks.forEach(e => {
            arr.push(new DownloadTaskStorage(e));
        });
        this.storage.set(ConstVal.DOWNLOAD_TASKS, arr).then();
    }

    delTask(status: DownloadTaskStatus) {
        this.tasks = this.tasks.filter((e, index, arr) => {
            if (e.status === status && e.checked) {
                if (e.status === DownloadTaskStatus.Done && e.fileName) { // 非下载完成的任务，不能删除
                    if (this.platform.is('cordova')) {
                        this.file.removeFile(this.file.dataDirectory, e.fileName).then(data => {
                            console.log('保存文件回调');
                            console.log(data);
                        });
                    }
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });
        this.updateStorage();
    }

    getTaskById(id: string): DownloadTask {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].taskId === id) {
                return this.tasks[i];
            }
        }
    }
}
