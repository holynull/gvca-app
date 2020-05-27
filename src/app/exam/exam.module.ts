import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PopMenuComponent } from './pop-menu/pop-menu.component';
import { SimulationComponent } from './simulation/simulation.component';
import { ExamineComponent } from './examine/examine.component';
import { AnswerComponent } from './answer/answer.component';


@NgModule({
    declarations: [
        HomeComponent,
        PopMenuComponent,
        SimulationComponent,
        ExamineComponent,
        AnswerComponent,
    ],
    imports: [
        CommonModule,
        ExamRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class ExamModule { }
