import { Pipe, PipeTransform } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { format, endOfWeek, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';

const locale = fr;

@Pipe({ name: 'DateNav' })
export class DateNav implements PipeTransform {
  transform(value: any, view?: string): string {
    let date = value;
    let dateFormat = 'dd';
    let month = format(date, 'MMMM', { locale });
    let year = format(date, 'yyyy');
    let day = format(date, 'iiii', { locale });

    switch (view) {
      case CalendarView.Day:
        return `${day} ${date.getDate()} ${month} ${year}`;
      case CalendarView.Month:
        return `${month} ${year}`;
      default:
        let start = startOfWeek(date, { weekStartsOn: 1 });
        let end = endOfWeek(date, { weekStartsOn: 1 });
        let monthStart =
          start.getMonth() === end.getMonth()
            ? ''
            : format(start, 'MMMM', { locale });
        let monthEnd = format(end, 'MMMM', { locale });

        return `Du ${format(start, dateFormat)} ${monthStart} au ${format(
          end,
          dateFormat
        )} ${monthEnd} ${year}`;
    }
  }
}
