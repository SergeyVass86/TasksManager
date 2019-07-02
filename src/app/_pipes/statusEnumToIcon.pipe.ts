import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../_models/enums';

@Pipe({
  name: 'statusEnumToIcon'
})
export class StatusEnumToIconPipe implements PipeTransform {

  transform(value: number): any {
    switch (value) {
      case TaskStatus.NotStarted:
        return 'fa-hourglass';
      case TaskStatus.Started:
        return 'fa-play';
      case TaskStatus.Completed:
        return 'fa-check';
      case TaskStatus.InHiatus:
        return 'fa-stop';
    }
  }

}
