import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-course-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {

    editable: boolean = false;

    curTab: number = 1;
    constructor() { }

    ngOnInit() { }

    changeEditStatus() {
        if (this.editable) {
            this.editable = false;
        } else {
            this.editable = true;
        }
    }

    changeTab(tab) {
        this.curTab = tab;
    }

}
