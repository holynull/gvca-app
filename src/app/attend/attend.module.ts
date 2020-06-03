import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendRoutingModule } from './attend-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AskLeaveComponent } from './ask-leave/ask-leave.component';
import { RecordsComponent } from './records/records.component';


@NgModule({
    declarations: [
        HomeComponent,
        AskLeaveComponent,
        RecordsComponent,
    ],
    imports: [
        CommonModule,
        AttendRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class AttendModule { }
