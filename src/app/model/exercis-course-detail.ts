import { ExercisQuestion } from './exercis-que';

export class ExercisCourseDetail {
    dateline: number;
    name: string;
    questionUsedSum: number;
    qcid: number;
    pid: number;
    questionSum: number;
    status: number;
    questions: Array<ExercisQuestion> = new Array();
}