import { ExercisCourseDetail } from './exercis-course-detail';

export class ExercisCourse {
    dateline: number;
    name: string;
    questionUsedSum: number;
    qcid: number;
    pid: number;
    questionSum: number;
    status: number;
    details: Array<ExercisCourseDetail> = new Array();
    openState: string = 'close';

    getDetailById(id: number): ExercisCourseDetail {
        for (let i = 0; i < this.details.length; i++) {
            if (Number(id) === this.details[i].qcid) {
                return this.details[i];
            }
        }
    }

    toggleOpenClose() {
        if (this.openState === 'close') {
            this.openState = 'open';
        } else {
            this.openState = 'close';
        }
    }

}