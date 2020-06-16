import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
    declarations: [
        HomeComponent,
        DetailComponent,
        SafeHtmlPipe
    ],
    imports: [
        CommonModule,
        NoticeRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class NoticeModule { }
