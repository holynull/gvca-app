import { Question } from './question';

export class ExercisCourseDetail {
    dateline: number;
    name: string;
    questionUsedSum: number;
    qcid: number;
    pid: number;
    questionSum: number;
    status: number;
    questions: Array<Question> = new Array();
}