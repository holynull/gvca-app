import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        AssignmentRoutingModule,
        IonicModule,
        FormsModule,
    ]
})
export class AssignmentModule { }
