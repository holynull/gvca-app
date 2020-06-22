import { QuestionOption } from './que-option';
import { QuestionType } from './question-type';

export class ExercisQuestion {
    trueAnswer: string;
    questionId: number;
    question: string;
    addTime: Date;
    questionCategoryId: number;
    optional: Array<QuestionOption> = new Array();
    updateTime: Date;
    studentAnswer: string;
    explains: string;
    questionType: QuestionType;
    questionStatus: number;

    isSelectedOpt(opt: QuestionOption) {
        return this.studentAnswer.indexOf(opt.key) !== -1;
    }
}