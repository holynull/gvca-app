import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { AskLeaveComponent } from '../ask-leave/ask-leave.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AttendService } from 'app/services/attend.service';
import { SignRecord } from 'app/model/sign-record';
import { SignStatus } from 'app/model/sign-status.enum';
import { AppModule } from 'app/app.module';
declare let BMap: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


    // 创建视图
    // tslint:disable-next-line: variable-name
    @ViewChild('map', { static: false }) private map_container: ElementRef;

    // 地图对象
    map: any;  // 用来控制watchposition，以便在退出页面的时候关闭

    curRecord: SignRecord;

    status: SignStatus;

    now: Date = new Date();

    distance: number = 99999999999;

    lng: number;
    lat: number;

    constructor(
        private modalCtrl: ModalController,
        private geolocation: Geolocation,
        private platform: Platform,
        private alertCtrl: AlertController,
        private attendSvr: AttendService,
    ) {
        this.status = this.attendSvr.signStatus(new Date());
        this.curRecord = this.attendSvr.getRecord(new Date());
    }


    ngOnInit() { }
    //在进入页面的时候触发
    ionViewDidEnter() {
        const map = this.map = new BMap.Map('map_container');  //创建地图实例
        let myIcon = new BMap.Icon("assets/images/marker.png", new BMap.Size(27.2, 42.7));
        let cPoint = new BMap.Point(this.attendSvr.company.longitude, this.attendSvr.company.latitude);
        let cMarker = new BMap.Marker(cPoint, { label: this.attendSvr.company.companyName });
        map.addOverlay(cMarker);
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
                            this.lng = rPoint.lng;
                            this.lat = rPoint.lat;
                            // 初始化地图，设置中心点坐标和地图级别
                            map.centerAndZoom(point, 17);
                            var marker = new BMap.Marker(point, { icon: myIcon });        // 创建标注   
                            map.addOverlay(marker);
                            this.distance = map.getDistance(cPoint, point);
                        }
                    }
                });
            });
        } else {
            // const point = new BMap.Point(116.4);
            // 初始化地图，设置中心点坐标和地图级别
            map.centerAndZoom(cPoint, 17);
            var marker = new BMap.Marker(cPoint, { icon: myIcon, label: this.attendSvr.company.companyName });        // 创建标注   
            map.addOverlay(marker);

        }
    }

    ionViewDidLeave() {
        this.map = null;
    }

    sign() {
        if (this.status === SignStatus.NONE) {
            this.attendSvr.sign(this.lng, this.lat, this.distance).then();
        }
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
        let res = await modal.onDidDismiss();
        this.attendSvr.askLeave(res.data).then(success => {
            if (success) {
                this.now = new Date();
                this.curRecord = this.attendSvr.getRecord(this.now);
            } else {

            }
        });
    }

}
