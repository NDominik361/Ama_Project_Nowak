import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTransform'
})
export class TimeTransformPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  
}
