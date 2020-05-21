import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineRoutingModule } from './mine-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        MineRoutingModule
    ]
})
export class MineModule { }
