import { QuestionOption } from './que-option';
import { QuestionState } from './question-state.enum';
import { QuestionType } from './question-type.enum';

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
    score: number;
    sort: number;

    isSelectedOpt(opt: QuestionOption) {
        return this.studentAnswer.indexOf(opt.key) !== -1;
    }

    isAnswerSelectedOpt(opt: QuestionOption) {
        return this.trueAnswer.indexOf(opt.key) !== -1;
    }

    giveAnswer(answer: QuestionOption | boolean) {
        if (answer instanceof QuestionOption) {
            if (this.questionType === QuestionType.MUTI_ANSWER) {
                if (!this.studentAnswer) {
                    this.studentAnswer = answer.key;
                } else {
                    let iKey = this.studentAnswer.indexOf(answer.key);
                    if (iKey > -1) {
                        this.studentAnswer = this.studentAnswer.replace(answer.key, '');
                    } else {
                        this.studentAnswer = this.studentAnswer + answer.key;
                    }
                }
            } else if (this.questionType === QuestionType.ONE_ANSWER) {
                this.studentAnswer = answer.key;
            }
        } else if (answer === true || answer === false) {
            this.studentAnswer = String(answer ? 1 : 2);
        }

    }

    /**
     * 计算得分
     */
    getQuestionScore(): number {
        if (this.getState() === QuestionState.RIGHT) {
            return this.score;
        } else {
            return 0;
        }
    }

    getState(): QuestionState {
        if (!this.studentAnswer || this.studentAnswer === '') {
            return QuestionState.NONE;
        } else {
            if (this.trueAnswer === this.studentAnswer) {
                return QuestionState.RIGHT;
            } else {
                return QuestionState.WRONG;
            }
        }
    }
}