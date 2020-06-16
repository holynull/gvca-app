import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadTasksPipe } from './download-tasks.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';



@NgModule({
    declarations: [
        DownloadTasksPipe,
        SafeUrlPipe,
        SafeHtmlPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DownloadTasksPipe,
        SafeUrlPipe,
        SafeHtmlPipe,
    ]
})
export class PipesModule { }
