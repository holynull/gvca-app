import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineRoutingModule } from './mine-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
    declarations: [
        HomeComponent,
        SettingsComponent,
    ],
    imports: [
        CommonModule,
        MineRoutingModule,
        IonicModule,
    ]
})
export class MineModule { }
