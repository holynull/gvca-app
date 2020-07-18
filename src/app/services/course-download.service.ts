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
import { Lesson } from 'app/model/lesson';




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
            console.error("调试")
            if (data) {
                data.forEach((d, index, arr) => {
                    let task = new DownloadTask(d.targetUrl, this.api, this.platform, this.file, this.transfer);
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
                    if (d.lessonName) {
                        task.lessonName = d.lessonName;
                    }
                    if (d.videosize) {
                        task.videosize = Number(d.videosize);
                    }
                    if (d.lessonLength) {
                        task.lessonLength = Number(d.lessonLength);
                    }
                    if (d.courseId) {
                        task.courseId = d.courseId;
                    }
                    this.tasks.push(task);
                });
            }
        });
        if (this.platform.is('cordova')) {
            let root = this.file.dataDirectory;
            let rFileName = environment.videoDir;
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

    runTask(lesson: Lesson): DownloadTask {
        let exsits = false;
        let task: DownloadTask;
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].lessonId === lesson.lessonId) {
                exsits = true;
                task = this.tasks[i];
                break;
            }
        }
        if (!exsits) {
            task = new DownloadTask(lesson.videoUrl, this.api, this.platform, this.file, this.transfer);
            task.taskId = String(new Date().getTime());
            task.api = this.api;
            task.lessonId = lesson.lessonId;
            task.lessonName = lesson.lessonName;
            task.lessonLength=lesson.lessonLength;
            task.videosize=lesson.videosize;
            task.courseId = lesson.courseId;
            this.tasks.push(task);
            this.updateStorage();
        }
        task.run(() => {
            this.updateStorage();
        });
        return task;
    }

    public updateStorage() {
        let arr = new Array();
        this.tasks.forEach(e => {
            arr.push({
                taskId: e.taskId,
                total: e.total,
                loaded: e.loaded,
                nativeUrl: e.nativeUrl,
                status: e.status,
                speed: e.speed,
                checked: e.checked,
                fileName: e.fileName,
                fullPath: e.fullPath,
                targetUrl: e.targetUrl,
                lessonId: e.lessonId,
                courseId: e.courseId,
                lessonName: e.lessonName,
                lessonLength:e.lessonLength,
                videosize:e.videosize,
            });
        });
        this.storage.set(ConstVal.DOWNLOAD_TASKS, arr).then();
    }

    delTask(status: DownloadTaskStatus) {
        this.tasks = this.tasks.filter((e, index, arr) => {
            if (e.status === status && e.checked) {
                if (e.status === DownloadTaskStatus.Done && e.fileName) { // 非下载完成的任务，不能删除
                    if (this.platform.is('cordova')) {
                        let root = this.file.dataDirectory;
                        let rFileName = environment.videoDir;
                        this.file.removeFile(root, rFileName + '/' + e.fileName).then(data => {
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
