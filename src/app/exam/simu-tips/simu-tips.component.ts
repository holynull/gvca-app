import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-simu-tips',
    templateUrl: './simu-tips.component.html',
    styleUrls: ['./simu-tips.component.scss'],
})
export class SimuTipsComponent implements OnInit {


    constructor(private modalCtrl: ModalController, private router: Router) { }

    ngOnInit() { }

    close() {
        this.modalCtrl.dismiss();
        this.router.navigate(['/tabs/exam']);
    }

}
