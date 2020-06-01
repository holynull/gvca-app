import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {

    editable: boolean = false;

    constructor() { }

    ngOnInit() { }

    changeEditStatus() {
        if (this.editable) {
            this.editable = false;
        } else {
            this.editable = true;
        }
    }

}
