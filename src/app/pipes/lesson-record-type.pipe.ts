import { Pipe, PipeTransform } from '@angular/core';
import { LessonRecord } from 'app/model/lesson-record';

@Pipe({
    name: 'lessonRecordType',
    pure: false,
})
export class LessonRecordTypePipe implements PipeTransform {

    transform(value: Array<LessonRecord>, ...args: unknown[]): unknown {
        return value.filter(e => {
            if (e.lessonType === args[0]) {
                return true;
            } else {
                return false;
            }
        });
    }

}
