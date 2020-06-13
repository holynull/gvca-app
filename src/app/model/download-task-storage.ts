import { Observable } from 'rxjs';
import { DownloadTaskStatus } from './download-task-status';
import { DownloadTask } from './download-task';

export class DownloadTaskStorage {
    taskId: string;
    total: number = 0;
    loaded: number = 0;
    nativeUrl: string;
    status: DownloadTaskStatus;
    speed: number = 0;
    checked: boolean = false;
    fileName: string;
    fullPath: string;
    url: string;

    constructor(task: DownloadTask) {
        this.taskId = task.taskId;
        this.total = task.total;
        this.loaded = task.loaded;
        this.nativeUrl = task.nativeUrl;
        this.status = task.status;
        this.speed = task.speed;
        this.checked = task.checked;
        this.fileName = task.fileName;
        this.fullPath = task.fullPath;
        this.url = task.url;
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
}