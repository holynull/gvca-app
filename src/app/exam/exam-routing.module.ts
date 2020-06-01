import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SimulationComponent } from './simulation/simulation.component';
import { ExamineComponent } from './examine/examine.component';
import { AnswerComponent } from './answer/answer.component';
import { ScoreComponent } from './score/score.component';
import { ReportComponent } from './report/report.component';
import { RecordsComponent } from './records/records.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'simulation', component: SimulationComponent },
    { path: 'examine', component: ExamineComponent },
    { path: 'answer', component: AnswerComponent },
    { path: 'score', component: ScoreComponent },
    { path: 'report', component: ReportComponent },
    { path: 'records', component: RecordsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamRoutingModule { }
