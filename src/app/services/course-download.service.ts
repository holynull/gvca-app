import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ConstVal } from 'app/constVal';
import { DownloadTask } from 'app/model/download-task';
import { DownloadTaskStatus } from 'app/model/download-task-status';
import { DownloadTaskStorage } from 'app/model/download-task-storage';
import { ApiService } from './api.service';
import { BaseService } from './base.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';




@Injectable({
    providedIn: 'root'
})
export class CourseDownloadService extends BaseService {

    tasks: Array<DownloadTask> = new Array();


    constructor(private api: ApiService, private file: File, private storage: Storage, private platform: Platform, private transfer: FileTransfer) {
        super();
        this.storage.get(ConstVal.DOWNLOAD_TASKS).then(data => {
            if (data) {
                data.forEach((d, index, arr) => {
                    let task = new DownloadTask(this.api, this.platform, file, this.transfer);
                    task.taskId = d.taskId;
                    task.total = Number(d.total);
                    task.loaded = Number(d.loaded);
                    task.nativeUrl = d.nativeUrl;
                    task.status = Number(d.status);
                    task.speed = Number(d.speed);
                    task.fileName = d.fileName;
                    task.fullPath = d.fullPath;
                    task.url = d.url;
                    this.tasks.push(task);
                });
            }
        });
        if (platform.is('cordova')) {
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
        let task = new DownloadTask(this.api, this.platform, this.file, this.transfer);
        task.taskId = String(new Date().getTime());
        task.url = 'https://images.plo.one/video/videogular.mp4';
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
