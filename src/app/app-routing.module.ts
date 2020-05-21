import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
    },
    {
        path: 'exam',
        loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule)
    },
    {
        path: 'assignment',
        loadChildren: () => import('./assignment/assignment.module').then(m => m.AssignmentModule)
    },
    {
        path: 'notice',
        loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule)
    },
    {
        path: 'attend',
        loadChildren: () => import('./attend/attend.module').then(m => m.AttendModule)
    },
    {
        path: 'mine',
        loadChildren: () => import('./mine/mine.module').then(m => m.MineModule)
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
