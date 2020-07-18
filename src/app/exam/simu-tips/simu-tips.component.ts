import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SimulationService } from 'app/services/simulation.service';

@Component({
    selector: 'app-simu-tips',
    templateUrl: './simu-tips.component.html',
    styleUrls: ['./simu-tips.component.scss'],
})
export class SimuTipsComponent implements OnInit {


    constructor(private modalCtrl: ModalController, private router: Router,public simuSvr:SimulationService) { }

    ngOnInit() { }

    close() {
        this.modalCtrl.dismiss();
        this.router.navigate(['/tabs/exam']);
    }

}
