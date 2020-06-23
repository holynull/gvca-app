import { Pipe, PipeTransform } from '@angular/core';
import { Question } from 'app/model/question';

@Pipe({
    name: 'queFilter',
    pure: false,
})
export class QueFilterPipe implements PipeTransform {

    transform(value: Array<Question>, ...args: any[]): unknown {
        return value.filter(e => {
            if (e.questionType === args[0]) {
                return true;
            } else {
                return false;
            }
        });
    }

}
