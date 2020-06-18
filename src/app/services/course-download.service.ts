import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ConstVal } from 'app/constVal';
import { DownloadTask } from 'app/model/download-task';
import { DownloadTaskStatus } from 'app/model/download-task-status';
import { ApiService } from './api.service';
import { BaseService } from './base.service';




@Injectable({
    providedIn: 'root'
})
export class CourseDownloadService extends BaseService {

    tasks: Array<DownloadTask> = new Array();


    constructor(private api: ApiService, private file: File, private storage: Storage, private platform: Platform, private transfer: FileTransfer) {
        super();

    }

    public initData() {
        this.storage.get(ConstVal.DOWNLOAD_TASKS).then(data => {
            if (data) {
                data.forEach((d, index, arr) => {
                    let task = new DownloadTask(d.urtl, this.api, this.platform, this.file, this.transfer);
                    task.taskId = d.taskId;
                    task.total = Number(d.total);
                    task.loaded = Number(d.loaded);
                    task.nativeUrl = d.nativeUrl;
                    task.status = Number(d.status);
                    task.speed = Number(d.speed);
                    task.fileName = d.fileName;
                    task.fullPath = d.fullPath;
                    if (d.lessonId) {
                        task.lessonId = d.lessonId;
                    }
                    this.tasks.push(task);
                });
            }
        });
        if (this.platform.is('cordova')) {
            let root = this.file.dataDirectory;
            let rFileName = environment.videoDir;
            if (this.platform.is('ios')) {
                root = this.file.documentsDirectory;
            }
            if (this.platform.is('android')) {
                rFileName = 'Documents/' + rFileName;
            }
            this.file.checkDir(root, rFileName).then(exists => {
                if (!exists) {
                    this.file.createDir(root, rFileName, false).then(entry => {
                    }).catch(e => {
                        console.error(e, {})
                    });
                }
            }).catch(e => {
                if (e.code === 1) {
                    this.file.createDir(root, rFileName, false).then(entry => {
                    }).catch(e => {
                        console.error(e, {});
                    });
                }
            });
        }
    }

    runTask(): DownloadTask {
        let url = 'https://images.plo.one/video/videogular.mp4';
        let task = new DownloadTask(url, this.api, this.platform, this.file, this.transfer);
        task.taskId = String(new Date().getTime());
        task.api = this.api;
        task.run(() => {
            this.updateStorage();
        });
        this.tasks.push(task);
        this.updateStorage();
        return task;
    }

    public updateStorage() {
        let arr = new Array();
        this.tasks.forEach(e => {
            arr.push({
                taskId: e.taskId,
                total: e.total,
                loaded: e.loaded,
                navtiveUrl: e.nativeUrl,
                status: e.status,
                speed: e.speed,
                checked: e.checked,
                fileName: e.fileName,
                fullPath: e.fullPath,
                targetUrl: e.targetUrl,
                lessonId: e.lessonId,
            });
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
                        }).catch(e => {
                            console.error(e, {});
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