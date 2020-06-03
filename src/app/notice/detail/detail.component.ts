import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    title: string;

    curTab: number;

    constructor(private activedRoute: ActivatedRoute) {
        this.activedRoute.queryParams.subscribe(params => {
            if (params && params.tab) {
                this.curTab = params.tab;
            }
            if (params && params.title) {
                this.title = params.title;
            }
        });
    }

    ngOnInit() { }

}
