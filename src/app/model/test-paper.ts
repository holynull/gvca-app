import { Question } from './question';
import { UsedState } from './used-state.enum';

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
    usedState: UsedState;
    status: number;
    questions: Array<Question> = new Array();
}