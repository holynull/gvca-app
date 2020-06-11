import { Pipe, PipeTransform } from '@angular/core';
import { DownloadTask } from 'app/model/download-task';

@Pipe({
    name: 'downloadTasks',
    pure: false,
})
export class DownloadTasksPipe implements PipeTransform {

    transform(value: Array<DownloadTask>, ...args: any[]): unknown {
        return value.filter((v, index, arr) => {
            let matchStatus = false; // 状态符合
            args[0].forEach(arg1 => {
                if (arg1 === v.status) {
                    matchStatus = true;
                }
            });
            if (matchStatus) { // 第一个参数是状态
                if (args[1] && args[1] === true) { // 过滤掉没有选中的
                    return v.checked === true;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
    }

}
