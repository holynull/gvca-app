import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

    constructor(private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController) { }

    ngOnInit() { }

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
                    console.log('Delete clicked');
                }
            }, {
                text: '从相册选择',
                // icon: 'share',
                handler: () => {
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
}
