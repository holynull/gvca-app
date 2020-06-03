import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {

    exempted: boolean = false;

    constructor() { }

    ngOnInit() { }

    exempt() {
        this.exempted = !this.exempted;
    }

}
