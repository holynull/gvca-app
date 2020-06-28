import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'app/services/guard/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { ModifyPwdComponent } from './modify-pwd/modify-pwd.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }, 
    { path: 'modify_pwd', component: ModifyPwdComponent, canActivate: [AuthGuard] }, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MineRoutingModule { }
