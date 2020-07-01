import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { AttendService } from 'app/services/attend.service';
import { SignRecord } from 'app/model/sign-record';
import { ExemptState } from 'app/model/exempt-state.enum';
import { SignStatus } from 'app/model/sign-status.enum';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {

    curRecord: SignRecord;

    curDate: Date;

    constructor(
        public attendSvr: AttendService,
        @Inject(LOCALE_ID) private locale: string,
    ) { }

    ngOnInit() { }

    exempt() {
        if (!this.curRecord || this.curRecord.exemptState === ExemptState.NORMAL) {
            this.attendSvr.applyExempt(this.curDate).then(success => {
                if (success) {
                    this.curRecord = this.attendSvr.getRecord(this.curDate);
                }
            });
        }
    }

    onDateChange(d: Date) {
        this.curDate = d;
        this.curRecord = this.attendSvr.getRecord(d);
    }

    isPreToday(): boolean {
        if (this.curDate) {
            let now = new Date();
            now = new Date(now.setHours(0, 0, 0, 0));
            let date = new Date(this.curDate.setHours(0, 0, 0, 0));
            return date.getTime() <= now.getTime();
        } else {
            return false;
        }
    }

}
