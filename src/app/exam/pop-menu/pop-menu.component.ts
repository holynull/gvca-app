import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pop-menu',
    templateUrl: './pop-menu.component.html',
    styleUrls: ['./pop-menu.component.scss'],
})
export class PopMenuComponent implements OnInit {

    @Input()
    title: string;

    constructor(private popoverCtrl: PopoverController, private router: Router) { }

    ngOnInit() { }

    close() {
        this.popoverCtrl.dismiss();
    }

    nav(index) {
        this.popoverCtrl.dismiss();
        if (index === 1) {
            this.router.navigate(['/tabs/exam']);
        }
        if (index === 2) {
            this.router.navigate(['/tabs/exam/simulation']);
        }
        if (index === 3) {
            // TODO: 
            this.router.navigate(['/tabs/exam/examine']);
        }
    }

}
