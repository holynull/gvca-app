import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'app/services/guard/auth.guard';
import { RecordsComponent } from './records/records.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'records', component: RecordsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AttendRoutingModule { }
