import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'isArray'
})
export class IsArrayPipe implements PipeTransform {
  transform<T>(value: any): value is any[] {
    return Array.isArray(value);
  }
}
