import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiUtilsService {

    alert: HTMLIonAlertElement

    constructor(private alertCtrl: AlertController) { }

    async presentAlert(e: Error, debug?: boolean, src?: string) {
        let title = "温馨提示";
        let content = "当前网络环境不稳定，请稍后再试。" + (debug ? ("\n" + e.name + ':' + e.message + ':' + src) : '');
        let btnCancelTxt = "确定";
        if (!this.alert) {
            this.alert = await this.alertCtrl.create({
                header: title,
                message: content,
                backdropDismiss: false,
                buttons: [
                    {
                        text: btnCancelTxt,
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            // console.log('Confirm Cancel: blah');
                        }
                    }
                ]
            });
            await this.alert.present();
            let dismissData = await this.alert.onDidDismiss();
            this.alert = null;
        }
    }
}
