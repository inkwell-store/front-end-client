import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { Profile } from '../../models/Profile';
import { MatButton } from '@angular/material/button';
import { PatchableProfile } from '../../models/PatchableProfile';

@Component({
    selector: 'app-profile-form',
    imports: [
        MatDialogActions,
        MatFormField,
        MatLabel,
        MatDialogContent,
        ReactiveFormsModule,
        MatInputModule,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogTitle
    ],
    templateUrl: './profile-form.html',
    styleUrl: './profile-form.css',
})
export class ProfileForm implements OnInit {

    private readonly dialogRef = inject(MatDialogRef);
    readonly data = inject<{profile: PatchableProfile }>(MAT_DIALOG_DATA);

    profileFormGroup: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('',[Validators.required]),
        dateOfBirth: new FormControl(),
    });

    ngOnInit(): void {
        this.profileFormGroup.setValue(this.data);
    }

    /**
     * Closes the dialog and emits the value form's value ONLY if the form is valid.
     */
    onSave(): void {

        if(this.profileFormGroup.valid) {
            this.dialogRef.close(this.profileFormGroup.value as PatchableProfile);
        }

        console.log(this.profileFormGroup);
    }

    /**
     * Closes the dialog and returns undefined
     */
    onCancel(): void {
        this.dialogRef.close() // close the dialog and send undefined to the parent
    }
}
