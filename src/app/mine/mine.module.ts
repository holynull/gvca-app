import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineRoutingModule } from './mine-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        MineRoutingModule,
        IonicModule,
    ]
})
export class MineModule { }
