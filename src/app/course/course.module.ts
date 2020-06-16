import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DownloadComponent } from './download/download.component';
import { RecordsComponent } from './records/records.component';
import { VgSupportsModule } from 'app/vg-supports.module';
import { PipesModule } from 'app/pipes/pipes.module';


@NgModule({
    declarations: [
        HomeComponent,
        DetailComponent,
        ConfirmComponent,
        DownloadComponent,
        RecordsComponent,
    ],
    imports: [
        CommonModule,
        CourseRoutingModule,
        IonicModule,
        FormsModule,
        VgSupportsModule,
        PipesModule,
    ],
    entryComponents: [
        ConfirmComponent,
    ],
    providers: [
    ]
})
export class CourseModule { }
