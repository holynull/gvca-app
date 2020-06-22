import { ExercisQuestion } from './exercis-que';

export class QuestionOption {
    key: string;
    description: string;

    constructor(key?: string, description?: string) {
        if (key && description) {
            this.key = key;
            this.description = description;
        }
    }
}