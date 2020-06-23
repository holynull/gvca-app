import { QuestionOption } from './que-option';
import { QuestionType } from './question-type.enum';
import { QuestionState } from './question-state.enum';

export class Question {
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
    state: QuestionState = QuestionState.NONE;
    score: number;

    isSelectedOpt(opt: QuestionOption) {
        return this.studentAnswer.indexOf(opt.key) !== -1;
    }

    giveAnswer(answer: QuestionOption | boolean) {
        if (answer instanceof QuestionOption) {
            if (this.questionType === QuestionType.MUTI_ANSWER) {
                if (!this.studentAnswer) {
                    this.studentAnswer = answer.key;
                } else {
                    this.studentAnswer = this.studentAnswer + answer.key;
                }
            } else if (this.questionType === QuestionType.ONE_ANSWER) {
                this.studentAnswer = answer.key;
            }
        } else if (answer === true || answer === false) {
            this.studentAnswer = String(answer ? 1 : 2);
        }
        if (this.trueAnswer === this.studentAnswer) {
            this.state = QuestionState.RIGHT;
        } else {
            this.state = QuestionState.WRONG;
        }
    }

    /**
     * 计算得分
     */
    getQuestionScore(): number {
        if (this.state === QuestionState.RIGHT) {
            return this.score;
        } else {
            return 0;
        }
    }
}