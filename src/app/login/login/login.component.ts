import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


    userName: string = '';

    pwd: string = '';

    url: string;

    constructor(private alertCtrl: AlertController, private auth: AuthService, private activedRoute: ActivatedRoute,
        private router: Router) {
        this.activedRoute.queryParams.subscribe(params => {
            if (params && params.url) {
                this.url = params.url;
            }
        });
    }

    ngOnInit() { }

    login() {
        this.auth.login(this.userName, this.pwd).subscribe(async res => {
            if (res.code === 1) {
                this.router.navigate([this.url ? this.url : '/tabs/home']);
            } else {
                const alert = await this.alertCtrl.create({
                    header: "温馨提示",
                    message: res.msg,
                    backdropDismiss: false,
                    buttons: [
                        {
                            text: "确定",
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: (blah) => {
                            }
                        }
                    ]
                });
                await alert.present();
            }
        });
    }

}
