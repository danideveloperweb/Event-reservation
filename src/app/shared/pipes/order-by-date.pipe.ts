import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate',
  standalone: true
})
export class OrderByDatePipe implements PipeTransform {
  public transform<T, K extends keyof T>(value: T[], key: K): T[] {
    return OrderByDatePipe.sortArray(value, key);
  }

  public static sortArray<T, K extends keyof T>(value: T[], key: K): T[] {
    if (!Array.isArray(value)) {
      return value;
    }
    return value.sort((a, b) => {
      const dateA = Number(a[key] ?? 0);
      const dateB = Number(b[key] ?? 0);
      return dateA - dateB;
    });
  }
}
