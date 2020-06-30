import { Component, OnInit } from '@angular/core';
import { AttendService } from 'app/services/attend.service';
import { SignRecord } from 'app/model/sign-record';
import { ExemptState } from 'app/model/exempt-state.enum';
import { SignStatus } from 'app/model/sign-status.enum';

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
    ) { }

    ngOnInit() { }

    exempt() {
        if (!this.curRecord || this.curRecord.exemptState === ExemptState.NORMAL) {
            this.attendSvr.applyExempt(this.curDate).then(success => {
                if (success) {
                    if (this.curRecord) {
                        this.curRecord.exemptState = ExemptState.NORMAL;
                    } else {
                        this.curRecord = new SignRecord();
                        this.curRecord.exemptState = ExemptState.EXEMPTED;
                        this.curRecord.signStatus = SignStatus.APPLY_EXEMPT;
                        this.curRecord.signDate = this.curDate;
                        this.attendSvr.records.push(this.curRecord);
                    }
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
