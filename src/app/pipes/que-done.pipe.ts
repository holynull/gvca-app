import { Pipe, PipeTransform } from '@angular/core';
import { Question } from 'app/model/question';

@Pipe({
  name: 'queDone'
})
export class QueDonePipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): unknown {
    return value.filter(e=>{
        return e.questionSum===e.questionUsedSum
    });
  }

}
