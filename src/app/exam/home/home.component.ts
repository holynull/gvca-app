import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopMenuComponent } from '../pop-menu/pop-menu.component';
import { ExercisesService } from 'app/services/exercises.service';
import { Router } from '@angular/router';
import { ExercisCourseDetail } from 'app/model/exercis-course-detail';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
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
            this.router.navigate(['/exam/answer'], { queryParams: { title: detail.name, pid: detail.pid, qcid: detail.qcid, from: 'exer' } });
        }
    }
    doRefresh(event) {
        this.eSvr.loadData().then(() => {
            event.target.complete();
        })
    }
}
