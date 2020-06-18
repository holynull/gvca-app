import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CourseSelectStates } from 'app/model/course-sel-status';
import { PageInfo } from 'app/model/pageInfo';
import { CourseService } from 'app/services/course.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    curTab;

    pageInfo: PageInfo = new PageInfo();

    selectState: CourseSelectStates = CourseSelectStates.NONEED;

    constructor(
        private modalCtrl: ModalController,
        public courseSvr: CourseService,
        private activedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.activedRoute.queryParams.subscribe(params => {
            if (params.tab) {
                this.curTab = Number(params.tab);
            } else {
                setTimeout(() => {
                    this.curTab = courseSvr.courseCats[0].courseTypeId;
                    this.pageInfo.firstPage()
                    this.courseSvr.loadCourse(this.curTab, this.pageInfo, (state) => {
                        this.selectState = Number(state);
                    });
                }, 0);
            }
        });
    }

    ngOnInit() { }

    select(tab) {
        this.curTab = Number(tab);
        this.pageInfo.firstPage()
        this.courseSvr.loadCourse(this.curTab, this.pageInfo, (state) => {
            this.selectState = Number(state);
        });
    }
    async presentConfirm(callBackOk: Function) {
        const modal = await this.modalCtrl.create({
            component: ConfirmComponent,
            cssClass: 'modal-dialog',
            backdropDismiss: false,
            componentProps: {
                'firstName': 'Douglas',
                'lastName': 'Adams',
                'middleInitial': 'N'
            }
        });
        await modal.present();
        const res = await modal.onWillDismiss();
        if (res.data && res.data.pressOk) {
            callBackOk();
        }
    }
    confirm() {
        this.presentConfirm(() => {
            console.log("press ok");
        });
    }

    doRefresh(event) {
        this.pageInfo.firstPage();
        this.courseSvr.loadCourse(this.curTab, this.pageInfo, (status) => {
            this.selectState = Number(status);
            event.target.complete();
        });
    }

    loadData(event) {
        this.pageInfo.nextPage();
        this.courseSvr.loadCourse(this.curTab, this.pageInfo, (status) => {
            this.selectState = Number(status);
            event.target.complete();
        });
    }

    goToDetail(id, tab) {
        let course = this.courseSvr.getCourse(id);
        let pageInfo = new PageInfo();
        pageInfo.firstPage();
        this.courseSvr.getLesson(pageInfo, id, (arr) => {
            course.lessons = arr;
            this.router.navigate(['/course/detail'], { queryParams: { id: id, tab: tab } });
        });
    }
}
