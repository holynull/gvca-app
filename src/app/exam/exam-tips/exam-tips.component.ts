import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExamService } from 'app/services/exam.service';

@Component({
    selector: 'app-exam-tips',
    templateUrl: './exam-tips.component.html',
    styleUrls: ['./exam-tips.component.scss'],
})
export class ExamTipsComponent implements OnInit {

    constructor(private modalCtrl: ModalController, private router: Router,public examSvr:ExamService) { }

    ngOnInit() { }

    close() {
        this.modalCtrl.dismiss();
        this.router.navigate(['/tabs/exam/simulation']);
    }

}
