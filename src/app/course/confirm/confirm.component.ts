import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Course } from 'app/model/course';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

    courses: Array<Course>;

    constructor(private modalCtrl: ModalController,
        private navParams: NavParams) {
        if (navParams.data.courses) {
            this.courses = navParams.data.courses;
        }
    }

    ngOnInit() { }

    ok() {
        this.modalCtrl.dismiss({ pressOk: true });
    }

    cancel() {
        this.modalCtrl.dismiss({ pressOk: false });
    }

}
