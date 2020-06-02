import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { DownloadComponent } from './download/download.component';
import { RecordsComponent } from './records/records.component';
import { AuthGuard } from 'app/services/guard/auth.guard';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'detail', component: DetailComponent, canActivate: [AuthGuard] },
    { path: 'download', component: DownloadComponent, canActivate: [AuthGuard] },
    { path: 'records', component: RecordsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
