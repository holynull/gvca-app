import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadTasksPipe } from './download-tasks.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { QueFilterPipe } from './que-filter.pipe';



@NgModule({
    declarations: [
        DownloadTasksPipe,
        SafeUrlPipe,
        SafeHtmlPipe,
        QueFilterPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DownloadTasksPipe,
        SafeUrlPipe,
        SafeHtmlPipe,
        QueFilterPipe,
    ]
})
export class PipesModule { }
