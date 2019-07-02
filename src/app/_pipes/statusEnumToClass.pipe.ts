import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../_models/enums';

@Pipe({
  name: 'statusEnumToClass'
})
export class StatusEnumToClassPipe implements PipeTransform {
  transform(value: number): any {
    switch (value) {
      case TaskStatus.NotStarted:
        return 'bg-light';
      case TaskStatus.Started:
        return 'text-white bg-primary';
      case TaskStatus.Completed:
        return 'text-white bg-success';
      case TaskStatus.InHiatus:
        return 'text-white bg-warning';
    }
  }
}
