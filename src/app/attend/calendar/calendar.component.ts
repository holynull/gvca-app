import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GestureController, Gesture } from '@ionic/angular';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

    @Input()
    curDate: Date = new Date();

    calendar: Array<Date> = new Array();

    slideFromRight: Gesture;

    @ViewChild('calendarDiv', {})
    calendarDiv: ElementRef;

    constructor(private gestureCtrl: GestureController) {
        setTimeout(() => {
            this.slideFromRight = this.gestureCtrl.create({
                el: this.calendarDiv.nativeElement,
                threshold: 15,
                gestureName: 'slide-from-right',
                direction: 'x',
                onEnd: ev => this.onGestureEnd(ev),
            }, true);
            this.slideFromRight.enable();
        }, 0);
    }

    ngOnInit() {
        this.genrateCalendar();
    }
    allowTrigger(ev) {
        let time = ev.currentTime - ev.startTime;
        let span = Math.abs(ev.currentX - ev.startX);
        return span > 20
    }
    onGestureEnd(ev) {
        console.log(ev);
        if (ev.startX > ev.currentX) {
            if (this.allowTrigger(ev)) {
                this.nextMonth();
            }
        } else {
            if (this.allowTrigger(ev)) {
                this.prevMonth();
            }
        }
    }
    getCurYear(): string {
        return String(this.curDate.getFullYear());
    }

    getCurMonth(): string {
        let m = this.curDate.getMonth();
        switch (m) {
            case 0:
                return '一月';
            case 1:
                return '二月';
            case 2:
                return '三月';
            case 3:
                return '四月';
            case 4:
                return '五月';
            case 5:
                return '六月';
            case 6:
                return '七月';
            case 7:
                return '八月';
            case 8:
                return '九月';
            case 9:
                return '十月';
            case 10:
                return '十一月';
            case 11:
                return '十二月';
        }
    }

    nextMonth() {
        let cm = this.curDate.getMonth();
        if (cm === 11) {
            this.curDate.setMonth(0);
            this.curDate.setFullYear(this.curDate.getFullYear() + 1);
        } else {
            this.curDate.setMonth(cm + 1);
        }
        this.genrateCalendar();
    }

    prevMonth() {
        let cm = this.curDate.getMonth();
        if (cm === 0) {
            this.curDate.setMonth(11);
            this.curDate.setFullYear(this.curDate.getFullYear() - 1);
        } else {
            this.curDate.setMonth(cm - 1);
        }
        this.genrateCalendar();
    }

    private nextDay(date: Date) {
        let y = date.getFullYear()
        let m = date.getMonth();
        let dd = date.getDate();
        let lastDay = new Date(y, m + 1, 0);
        if (m === 11 && dd === 31) {
            return new Date(y + 1, 0, 1);
        } else {
            if (date.toDateString() === lastDay.toDateString()) {
                return new Date(y, m + 1, 1);
            } else {
                return new Date(y, m, dd + 1);
            }
        }
    }

    private prevDay(date: Date) {
        let y = date.getFullYear()
        let m = date.getMonth();
        let dd = date.getDate();
        let firstDay = new Date(y, m, 1);
        if (m === 0 && dd === 1) {
            return new Date(y - 1, 11, 31);
        } else {
            if (date.toDateString() === firstDay.toDateString()) {
                return new Date(y, m, 0);
            } else {
                return new Date(y, m, dd - 1);
            }
        }
    }

    genrateCalendar() {
        this.calendar.splice(0, this.calendar.length);
        let y = this.curDate.getFullYear(), m = this.curDate.getMonth();
        let firstDay = new Date(y, m, 1);
        let lastDay = new Date(y, m + 1, 0);
        let prevDays = firstDay.getDay();
        let lastDays = 7 - lastDay.getDay() - 1;
        for (let i = 0, d = this.prevDay(firstDay); i < prevDays; i++) {
            this.calendar.push(d);
            d = this.prevDay(d);
        }
        for (; firstDay.getTime() <= lastDay.getTime();) {
            this.calendar.push(firstDay);
            firstDay = this.nextDay(firstDay);
        }
        for (let i = 0; i < lastDays; i++) {
            let d = this.nextDay(lastDay);
            this.calendar.push(d);
            lastDay = d;
        }
        this.calendar.sort((a, b) => {
            if (a.getTime() > b.getTime()) {
                return 1;
            } else if (a.getTime() < b.getTime()) {
                return -1;
            } else {
                return 0;
            }
        });
    }

}
