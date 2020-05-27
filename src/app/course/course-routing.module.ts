import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { DownloadComponent } from './download/download.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detail', component: DetailComponent },
    { path: 'download', component: DownloadComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
