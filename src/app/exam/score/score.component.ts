import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {

    title: string;

    constructor(
        private activeRoute: ActivatedRoute,
    ) {
        this.activeRoute.queryParams.subscribe(params => {
            if (params && params.title) {
                this.title = params.title;
            }
        });
    }

    ngOnInit() { }

}
