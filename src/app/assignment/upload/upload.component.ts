import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavParams, LoadingController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { environment } from '@env/environment';
import { HomeworkService } from 'app/services/homework.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

    hId: number;

    nativeUrls: Array<string> = new Array();

    viewUrls: Array<string> = new Array();

    loading;

    constructor(
        private modalCtrl: ModalController,
        private actionSheetCtrl: ActionSheetController,
        private navParams: NavParams,
        private camera: Camera,
        private webview: WebView,
        private transfer: FileTransfer,
        private api: ApiService,
        private auth: AuthService,
        private hwSvr: HomeworkService,
        public loadingCtrl: LoadingController,
    ) {
        this.hId = this.navParams.data.hId;
    }

    ngOnInit() { }

    async loadingPresent() {
        this.loading = await this.loadingCtrl.create({
            message: "正在上传...",
            backdropDismiss: false,
            duration: 10000,
        });

        await this.loading.present();
    }
    close() {
        this.modalCtrl.dismiss();
    }

    async getPic() {
        const actionSheet = await this.actionSheetCtrl.create({
            // header: 'Albums',
            cssClass: 'my-action-sheet',
            buttons: [{
                text: '拍照',
                // role: 'destructive',
                // icon: 'trash',
                handler: () => {
                    this.capturePhoto();
                }
            }, {
                text: '从相册选择',
                // icon: 'share',
                handler: () => {
                    this.pickPhoto();
                }
            }, {
                text: '取消',
                // icon: 'close',
                role: 'cancel',
                handler: () => {
                }
            }]
        });
        await actionSheet.present();
    }

    pickPhoto() {
        const options: CameraOptions = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
        };
        this.camera.getPicture(options).then(res => {
            this.nativeUrls.push(res);
            this.viewUrls.push(this.webview.convertFileSrc(res));
        }).catch(err => {
            console.error('选取照片时出错', err);
        });
    }

    capturePhoto() {
        const options: CameraOptions = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
        };
        this.camera.getPicture(options).then(res => {
            this.nativeUrls.push(res);
            this.viewUrls.push(this.webview.convertFileSrc(res));
        }).catch(err => {
            console.error('拍摄照片时出错', err);
        });
    }

    submit() {
        let hw = this.hwSvr.getHomeworkById(this.hId);
        let pArr: Array<Promise<any>> = new Array<Promise<any>>();
        this.loadingPresent();
        this.nativeUrls.forEach(nUrl => {
            let fileTransfer = this.transfer.create();
            let options: FileUploadOptions = {
                fileKey: 'Filedata',
                fileName: nUrl.substring(nUrl.lastIndexOf('/') + 1),
                headers: {},
                params: {
                    token: this.auth.token,
                }
            };
            let url = this.api.url(environment.api.uploadfile.url);
            let p = fileTransfer.upload(nUrl, url, options).then(res => {
                let json = JSON.parse(res.response);
                if (json.code === 1) {
                    return json.path;
                } else {
                    console.error('上传作业图片，接口返回错误码', res);
                    return false;
                }
            }).catch(err => {
                console.error('上传头像出错', err);
            });
            pArr.push(p);
        });
        let path: string;
        Promise.all(pArr).then(values => {
            let hasErr = false;
            for (let i = 0; i < values.length; i++) {
                if (!values[i]) {
                    hasErr = true;
                    break;
                } else {
                    if (!path) {
                        path = values[i];
                    } else {
                        path = path + ',' + values[i];
                    }
                }
            }
            if (!hasErr) {
                this.hwSvr.submit(hw, path, '').then(() => {
                    this.modalCtrl.dismiss();
                });
            }
            this.loading.dismiss();
            this.loading = null;
        });
    }

    delPic(index: number) {
        this.viewUrls.splice(index, 1);
    }
}
