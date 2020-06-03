import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
    declarations: [
        HomeComponent,
        DetailComponent
    ],
    imports: [
        CommonModule,
        NoticeRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class NoticeModule { }
