import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadTasksPipe } from './download-tasks.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { QueFilterPipe } from './que-filter.pipe';
import { LessonRecordTypePipe } from './lesson-record-type.pipe';
import { QueDonePipe } from './que-done.pipe';



@NgModule({
    declarations: [
        DownloadTasksPipe,
        SafeUrlPipe,
        SafeHtmlPipe,
        QueFilterPipe,
        LessonRecordTypePipe,
        QueDonePipe,
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
        QueDonePipe,
    ]
})
export class PipesModule { }
