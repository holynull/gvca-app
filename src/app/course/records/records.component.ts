import { Component, OnInit } from '@angular/core';
import { CourseService } from 'app/services/course.service';

@Component({
    selector: 'app-course-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {

    editable: boolean = false;

    curTab: number = 1;
    constructor(
        public courseSvr: CourseService,
    ) { }

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

    getLongStr(l: number) {
        if (l < 60) {
            return l + '秒';
        }
        let str = '';
        let m = Math.floor(l / 60);
        if (m > 0) {
            str = m + '分';
        }
        let s = l % 60;
        str = str + s + '秒';
        return str;
    }

}
