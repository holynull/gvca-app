import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modify-pwd',
    templateUrl: './modify-pwd.component.html',
    styleUrls: ['./modify-pwd.component.scss'],
})
export class ModifyPwdComponent implements OnInit {

    pwd: string;

    constructor(
        private auth: AuthService,
        private alertCtrl: AlertController,
        private router: Router,
    ) { }

    ngOnInit() { }

    submit() {
        if (!this.pwd) {
            alert('请输入新密码');
        } else {
            this.auth.updatePwd(this.pwd).then(res => {
                if (res.code === 1) {
                    this.router.navigate(['/mine/settings']);
                } else {
                    alert('修改密码出错，请重试。');
                }
            });
        }
    }

    async alert(msg: string) {
        const alert = await this.alertCtrl.create({
            header: "修改密码错误",
            message: msg,
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

}
