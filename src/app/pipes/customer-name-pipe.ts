import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customerName',
})
export class CustomerNamePipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        return (value === null || value === undefined ) ? "-" : value
    }
}
