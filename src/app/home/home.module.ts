import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from './pipes/safe-url.pipe';


@NgModule({
    declarations: [
        HomeComponent,
        SafeUrlPipe,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class HomeModule { }
