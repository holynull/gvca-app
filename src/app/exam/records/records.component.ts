import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {

    curTab = 1;

    constructor(private activedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() { }

    changeTab(tab) {
        this.curTab = tab;
    }
    toReport(title) {
        this.router.navigate(['/exam/report'], { queryParams: { title: title, url: '/exam/records' } });
    }
}
