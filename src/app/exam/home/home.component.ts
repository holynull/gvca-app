import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopMenuComponent } from '../pop-menu/pop-menu.component';
import { ExercisesService } from 'app/services/exercises.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    constructor(
        private popOverCtrl: PopoverController,
        public eSvr:ExercisesService,
        ) { }

    ngOnInit() { }

    async openPopMenu() {
        const dialog = await this.popOverCtrl.create({
            component: PopMenuComponent,
            cssClass: 'pop-top-menu',
            showBackdrop: true,
            backdropDismiss: true,
            componentProps: {
                title: "练习题库",
            }
        });
        await dialog.present();
        let dismissData = await dialog.onDidDismiss();
    }

}
