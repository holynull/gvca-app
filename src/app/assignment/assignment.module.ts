import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
    declarations: [
        HomeComponent,
        MyWorkComponent,
        UploadComponent,
    ],
    imports: [
        CommonModule,
        AssignmentRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class AssignmentModule { }
