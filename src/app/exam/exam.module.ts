import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        ExamRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class ExamModule { }
