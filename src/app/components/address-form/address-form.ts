import { Component, inject, Input, OnInit, output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { getStateAbbreviationByName, stateData, stateMap } from '../../utils/us-state';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdentifiedAddress } from '../../models/IdentifiedAddress';
import { SimpleAddress } from '../../models/SimpleAddress';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'app-address-form',
    imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions
    ],
    templateUrl: './address-form.html',
    styleUrl: './address-form.css',
})
export class AddressForm implements OnInit {

    // This gives me a way to pass (emit) data to the dialog from which
    // this form is opened.
    private readonly dialogRef = inject(MatDialogRef);

    // This allows me to receive data from the dialog, passed from the component
    // that opened it. I don't think it's necessary to create an interface to define
    // type here and although I don't like Union types I'm using them here.
    // official docs at:
    // https://material.angular.dev/components/dialog/overview#sharing-data-with-the-dialog-component
    readonly data = inject<{address?: SimpleAddress }>(MAT_DIALOG_DATA);

    states: stateData[] = stateMap;

    addressFormGroup: FormGroup = new FormGroup({
        name: new FormControl(''), //opt
        street: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [Validators.required]),
        line: new FormControl(''), //opt
        type: new FormControl<'SHIPPING' | 'BILLING' | 'BILLING_AND_SHIPPING'>('SHIPPING', [Validators.required])
    });

    ngOnInit(): void {

        // if data.address exists this is a update operation
        if(this.data.address) {

            this.data.address.state = getStateAbbreviationByName(this.data.address.state)!;
            this.addressFormGroup.setValue(this.data.address);

        }
    }

    /**
     * Returns the value of the address form if the form is valid.
     */
    onSave(): void {

        if(this.addressFormGroup.valid) {
            this.dialogRef.close(this.addressFormGroup.value as SimpleAddress);
        }

        console.log(this.addressFormGroup.value)
    }

    /**
     * Closes the dialog and emits `undefined` to it
     */
    onCancel(): void {
        this.dialogRef.close();
    }

}
