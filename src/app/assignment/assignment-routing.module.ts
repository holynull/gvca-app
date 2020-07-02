import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'app/services/guard/auth.guard';
import { MyWorkComponent } from './my-work/my-work.component';
import { CompletedComponent } from './completed/completed.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'my-work', component: MyWorkComponent, canActivate: [AuthGuard] },
    { path: 'completed', component: CompletedComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssignmentRoutingModule { }
