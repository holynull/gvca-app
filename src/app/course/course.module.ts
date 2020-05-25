import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';


@NgModule({
    declarations: [
        HomeComponent,
        DetailComponent,
    ],
    imports: [
        CommonModule,
        CourseRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class CourseModule { }
