import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


    userName: string;

    pwd: string;

    constructor(private alertCtrl: AlertController) { }

    ngOnInit() { }

    login() {
        if (!this.userName || !this.pwd) {

        } else {

        }
    }

}
