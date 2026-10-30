import { Component, inject, OnInit, signal, Signal, TemplateRef, viewChild } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { HttpCustomerService } from '../../services/http-customer-service';
import { CustomerNamePipe } from '../../pipes/customer-name-pipe';
import { NullableDatePipe } from '../../pipes/nullable-date-pipe';
import { MatButtonModule } from '@angular/material/button';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatchableProfile, Profile, ProfileProperties } from '../../models/customer-profile-models';

@Component({
    selector: 'app-customer-profile',
    imports: [
        MatDivider,
        MatIcon,
        CustomerNamePipe,
        NullableDatePipe,
        MatButtonModule,
    ],
    templateUrl: './customer-profile.html',
    styleUrl: './customer-profile.css',
})
export class CustomerProfile implements OnInit {

    private readonly httpCustomerService: HttpCustomerService = inject(HttpCustomerService);
    private readonly dialogService: MatDialog = inject(MatDialog);
    private readonly snackBarService: MatSnackBar = inject(MatSnackBar);

    profileInfo = signal<Profile | undefined>(undefined);

    updateProfileDialogRef: MatDialogRef<ProfileForm, PatchableProfile | undefined> | null = null;

    ngOnInit(): void {

        const attributes: ProfileProperties[] = [
            ProfileProperties.FIRST_NAME,
            ProfileProperties.LAST_NAME,
            ProfileProperties.PHOTO,
            ProfileProperties.DATE_OF_BIRTH
        ];

        this.httpCustomerService.getProfile(attributes).subscribe({
            next: (response) => {
                this.profileInfo.set(response);
            }
        });

    }

    openProfileDialog(): void {
        this.updateProfileDialogRef = this.dialogService.open(ProfileForm, {
            data: {
                firstName: this.profileInfo()?.firstName,
                lastName: this.profileInfo()?.lastName,
                dateOfBirth: this.profileInfo()?.dateOfBirth
            }
        });

        this.updateProfileDialogRef.afterClosed().subscribe({
            next: (value) => {
                if (value !== undefined) {
                    this.httpCustomerService.patchProfile(value).subscribe({
                        next: (response) => {
                            this.profileInfo.set(response);
                            this.snackBarService.open("Profile updated successfully!");
                        }
                    })
                }
            }
        })
    }

    updatePhoto(): void {
        alert("updatePhoto works!")
    }

}
