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

    getDetailById(id: number): ExercisCourseDetail {
        for (let i = 0; i < this.details.length; i++) {
            if (id === this.details[i].qcid) {
                return this.details[i];
            }
        }
    }
}