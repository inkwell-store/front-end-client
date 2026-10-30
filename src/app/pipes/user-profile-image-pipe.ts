import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userProfileImage',
})
export class UserProfileImagePipe implements PipeTransform {
    transform(value: string | undefined | null, ...args: unknown[]): string {
        return (value === undefined || value === null) ? "image-placeholder.png" : value;
    }
}
