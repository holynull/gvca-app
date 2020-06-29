import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineRoutingModule } from './mine-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { SettingsComponent } from './settings/settings.component';
import { ModifyPwdComponent } from './modify-pwd/modify-pwd.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';


@NgModule({
    declarations: [
        HomeComponent,
        SettingsComponent,
        ModifyPwdComponent,
        ProfilePictureComponent,
    ],
    imports: [
        CommonModule,
        MineRoutingModule,
        IonicModule,
        PipesModule,
        FormsModule,
    ]
})
export class MineModule { }
