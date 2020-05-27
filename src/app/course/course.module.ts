import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DownloadComponent } from './download/download.component';


@NgModule({
    declarations: [
        HomeComponent,
        DetailComponent,
        ConfirmComponent,
        DownloadComponent,
    ],
    imports: [
        CommonModule,
        CourseRoutingModule,
        IonicModule,
        FormsModule,
    ],
    entryComponents: [
        ConfirmComponent,
    ]
})
export class CourseModule { }
