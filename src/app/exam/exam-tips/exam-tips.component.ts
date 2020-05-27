import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exam-tips',
    templateUrl: './exam-tips.component.html',
    styleUrls: ['./exam-tips.component.scss'],
})
export class ExamTipsComponent implements OnInit {

    constructor(private modalCtrl: ModalController, private router: Router) { }

    ngOnInit() { }

    close() {
        this.modalCtrl.dismiss();
        this.router.navigate(['/tabs/exam/simulation']);
    }

}
