import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { AskLeaveComponent } from '../ask-leave/ask-leave.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare let BMap: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    signed: boolean = false;

    // 创建视图
    // tslint:disable-next-line: variable-name
    @ViewChild('map', { static: false }) private map_container: ElementRef;
    // 地图对象
    map: any;  // 用来控制watchposition，以便在退出页面的时候关闭


    constructor(private modalCtrl: ModalController, private geolocation: Geolocation, private platform: Platform, private alertCtrl: AlertController) {
    }


    ngOnInit() { }
    //在进入页面的时候触发
    ionViewDidEnter() {
        const map = this.map = new BMap.Map('map_container');  //创建地图实例
        if (this.platform.is('cordova')) {
            this.geolocation.getCurrentPosition().catch(async error => {
                let msg = JSON.stringify(error);
                const alert = await this.alertCtrl.create({
                    header: "定位错误",
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
            }).then((res: any) => {
                const gpsPoint = new BMap.Point(res.coords.longitude, res.coords.latitude);
                let pArr = [gpsPoint];
                const convertor = new BMap.Convertor();
                convertor.translate(pArr, 1, 5, res => {
                    if (res.status === 0) {
                        if (res.points && res.points.length > 0) {
                            let rPoint = res.points[0];
                            let point = new BMap.Point(rPoint.lng, rPoint.lat);
                            // 初始化地图，设置中心点坐标和地图级别
                            map.centerAndZoom(point, 19);
                            var marker = new BMap.Marker(point);        // 创建标注   
                            map.addOverlay(marker);
                        }

                    }
                });
            });
        } else {
            const point = new BMap.Point(116.404, 39.915);
            // 初始化地图，设置中心点坐标和地图级别
            map.centerAndZoom(point, 15);
            var marker = new BMap.Marker(point);        // 创建标注   
            map.addOverlay(marker);

        }
    }
    sign() {
        this.signed = !this.signed;
    }

    async toAskForLeave() {
        const modal = await this.modalCtrl.create({
            component: AskLeaveComponent,
            cssClass: 'modal-dialog',
            // backdropDismiss: false,
            componentProps: {
            }
        });
        await modal.present();
    }

}
