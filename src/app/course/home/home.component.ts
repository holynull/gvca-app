import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    curTab = 1;

    constructor() { }

    ngOnInit() { }

    select(tab) {
        this.curTab = tab;
    }
}
