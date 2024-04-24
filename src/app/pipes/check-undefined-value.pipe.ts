import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCheckUndefinedValue',
  standalone: true,
})
export class CheckUndefinedValuePipe implements PipeTransform {
  transform<T>(value: T): T | string {
    return value === undefined || value === null ? 'There is no data' : value;
  }
}
