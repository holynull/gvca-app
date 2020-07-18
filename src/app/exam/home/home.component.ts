import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopMenuComponent } from '../pop-menu/pop-menu.component';
import { ExercisesService } from 'app/services/exercises.service';
import { Router } from '@angular/router';
import { ExercisCourseDetail } from 'app/model/exercis-course-detail';
import { ExercisCourse } from 'app/model/exercis-course';
import { Question } from 'app/model/question';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                // opacity: 1,
            })),
            state('close', style({
                height: '0px',
                padding: '0px',
            })),
            transition('open => close', [
                animate('0.5s')
            ]),
            transition('close => open', [
                animate('0.5s')
            ]),
        ]),
    ],
})
export class HomeComponent implements OnInit {

    constructor(
        private popOverCtrl: PopoverController,
        public eSvr: ExercisesService,
        private router: Router,
    ) { }

    ngOnInit() { }

    async openPopMenu() {
        const dialog = await this.popOverCtrl.create({
            component: PopMenuComponent,
            cssClass: 'pop-top-menu',
            showBackdrop: true,
            backdropDismiss: true,
            componentProps: {
                title: "练习题库",
            }
        });
        await dialog.present();
        let dismissData = await dialog.onDidDismiss();
    }

    goToAnswer(detail: ExercisCourseDetail) {
        if (detail.questions.length > 0) {
            this.router.navigate(['/exam/answer'], { queryParams: { title: detail.name, pid: detail.pid, qcid: detail.qcid, dataType: 'exer', url: '/tabs/exam' } });
        }
    }
    doRefresh(event) {
        this.eSvr.loadData().then(() => {
            event.target.complete();
        })
    }
    toggleOpenClose(course: ExercisCourse) {
        this.eSvr.exercisCourses.forEach(e => {
            if (e.qcid === course.qcid) {
                e.openState = 'open';
            } else {
                e.openState = 'close';
            }
        });
    }
    goToReport(d:ExercisCourseDetail){
        this.router.navigate(['/exam/report'],{queryParams:{title:d.name,url:'/tabs/exam',dataType:'exer',pid:d.pid,qcid:d.qcid}});
    }
}
