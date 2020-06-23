import { Question } from './question';
import { UsedStatus } from './used-status.enum';

export class TestPaper {
    gradeId: number;
    majorId: number;
    addTime: Date;
    examName: string;
    sumScore: number;
    updateTime: Date;
    sort: number;
    semesterId: number;
    examTemplateId: number;
    examId: number;
    questionCategoryId: number;
    startTime: Date;
    endTime: Date;
    usedState: UsedStatus;
    status: number;
    questions: Array<Question> = new Array();
}