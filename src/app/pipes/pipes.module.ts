import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadTasksPipe } from './download-tasks.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { QueFilterPipe } from './que-filter.pipe';
import { LessonRecordTypePipe } from './lesson-record-type.pipe';



@NgModule({
    declarations: [
        DownloadTasksPipe,
        SafeUrlPipe,
        SafeHtmlPipe,
        QueFilterPipe,
        LessonRecordTypePipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DownloadTasksPipe,
        SafeUrlPipe,
        SafeHtmlPipe,
        QueFilterPipe,
        LessonRecordTypePipe,
    ]
})
export class PipesModule { }
