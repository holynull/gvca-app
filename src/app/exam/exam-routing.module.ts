import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SimulationComponent } from './simulation/simulation.component';
import { ExamineComponent } from './examine/examine.component';
import { AnswerComponent } from './answer/answer.component';
import { ScoreComponent } from './score/score.component';
import { ReportComponent } from './report/report.component';
import { RecordsComponent } from './records/records.component';
import { AuthGuard } from 'app/services/guard/auth.guard';
import { CertComponent } from './cert/cert.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'simulation', component: SimulationComponent, canActivate: [AuthGuard] },
    { path: 'examine', component: ExamineComponent, canActivate: [AuthGuard] },
    { path: 'answer', component: AnswerComponent, canActivate: [AuthGuard] },
    { path: 'score', component: ScoreComponent, canActivate: [AuthGuard] },
    { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
    { path: 'records', component: RecordsComponent, canActivate: [AuthGuard] },
    { path: 'cert', component: CertComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamRoutingModule { }
