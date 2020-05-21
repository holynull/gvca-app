import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        CourseRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class CourseModule { }
