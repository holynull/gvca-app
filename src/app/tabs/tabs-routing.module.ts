import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'course',
                loadChildren: () => import('../course/course.module').then(m => m.CourseModule)
            },
            {
                path: 'exam',
                loadChildren: () => import('../exam/exam.module').then(m => m.ExamModule)
            },
            {
                path: 'assignment',
                loadChildren: () => import('../assignment/assignment.module').then(m => m.AssignmentModule)
            },
            {
                path: 'mine',
                loadChildren: () => import('../mine/mine.module').then(m => m.MineModule)
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
