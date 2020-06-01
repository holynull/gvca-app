import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { DownloadComponent } from './download/download.component';
import { RecordsComponent } from './records/records.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detail', component: DetailComponent },
    { path: 'download', component: DownloadComponent },
    { path: 'records', component: RecordsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
