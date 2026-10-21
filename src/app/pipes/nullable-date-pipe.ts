import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nullableDate',
})
export class NullableDatePipe implements PipeTransform {

    private readonly datePipe: DatePipe = inject(DatePipe);

    transform(value: Date | null): string {
        return (value === null) ? "-" : this.datePipe.transform(value)!;
    }
}
