import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'app/services/auth.service';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { environment } from '@env/environment';
import { ApiService } from 'app/services/api.service';
import { CourseService } from 'app/services/course.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-picture',
    templateUrl: './profile-picture.component.html',
    styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent implements OnInit {

    picPath: string;
    picNativeUrl: string;

    constructor(
        public auth: AuthService,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private webview: WebView,
        private transfer: FileTransfer,
        private api: ApiService,
        private courseSvr: CourseService,
        private router: Router,
    ) {
        this.picPath = auth.userInfo.photo;
    }

    ngOnInit() { }

    async getPicAction() {
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
            quality: 50,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
            targetHeight: 160,
            targetWidth: 160,
        };
        this.camera.getPicture(options).then(res => {
            this.picNativeUrl = res;
            this.picPath = this.webview.convertFileSrc(res);
        }).catch(err => {
            console.error('选取照片时出错', err);
        });
    }

    capturePhoto() {
        const options: CameraOptions = {
            quality: 50,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
            targetHeight: 160,
            targetWidth: 160,
        };
        this.camera.getPicture(options).then(res => {
            this.picNativeUrl = res;
            this.picPath = this.webview.convertFileSrc(res);
        }).catch(err => {
            console.error('拍摄照片时出错', err);
        });
    }

    submit() {
        if (this.picNativeUrl) {
            let fileTransfer = this.transfer.create();
            let options: FileUploadOptions = {
                fileKey: 'Filedata',
                fileName: this.picNativeUrl.substring(this.picNativeUrl.lastIndexOf('/') + 1),
                headers: {},
                params: {
                    token: this.auth.token,
                }
            };
            let url = this.api.url(environment.api.uploadfile.url);
            fileTransfer.upload(this.picNativeUrl, url, options).then(res => {
                console.info(res);
                let json = JSON.parse(res.response);
                if (json.code === 1) {
                    this.auth.updateUserPhoto(json.path).then(success => {
                        if (success) {
                            this.courseSvr.getUserCourseInfo().then(() => {
                                this.auth.userInfo.photo = this.courseSvr.info.photo;
                                this.router.navigate(['/mine/settings']);
                            });
                        }
                    });
                } else {
                    console.error('上传头像，接口返回错误码', res);
                }
            }).catch(err => {
                console.error('上传头像出错', err);
            });
        }
    }
}
