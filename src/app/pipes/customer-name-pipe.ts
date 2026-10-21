import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customerName',
})
export class CustomerNamePipe implements PipeTransform {
    transform(value: string | null): string {
        return (value === null) ? "-" : value
    }
}
