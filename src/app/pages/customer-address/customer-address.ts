import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { HttpCustomerService } from '../../services/http-customer-service';
import { IdentifiedAddress } from '../../models/IdentifiedAddress';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddressForm } from '../../components/address-form/address-form';
import { SimpleAddress } from '../../models/SimpleAddress';
import { MatDivider } from '@angular/material/divider';
import { PatchableAddreess } from '../../models/PatchableAddreess';
import { ConfirmationDialog } from '../../components/confirmation-dialog/confirmation-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfoDialog } from '../../components/info-dialog/info-dialog';
import {MatMenuModule} from '@angular/material/menu';


@Component({
    selector: 'app-customer-address',
    imports: [MatCardModule, MatIcon, MatButtonModule, MatDivider, MatTooltipModule, MatMenuModule],
    templateUrl: './customer-address.html',
    styleUrl: './customer-address.css',
})
export class CustomerAddress implements OnInit {

    private readonly HttpCustomerService: HttpCustomerService = inject(HttpCustomerService);
    private readonly snackBarService: MatSnackBar = inject(MatSnackBar);
    private readonly dialogService: MatDialog = inject(MatDialog);

    addressList = signal<IdentifiedAddress[]>([]);
    isDataLoading = signal(true);

    ngOnInit(): void {
        this.loadAddressList();
    }

    loadAddressList(): void {

        this.isDataLoading.set(true);

        this.HttpCustomerService.getAddressList().subscribe({
            next: (response) => {
                this.addressList.set(response);
                this.isDataLoading.set(false);
            }
        });
    }

    deleteAddress(addressId: number): void {

        const confirmationDialog = this.dialogService.open(ConfirmationDialog, {
            data: { title: "Delete address", body: "Are you sure you want to delete this address?" }
        });

        confirmationDialog.afterClosed().subscribe({
            next: (value: 'CONFIRM' | 'CANCEL' | undefined) => {
                if (value === 'CONFIRM') {

                    // check if the there's another billing address available
                    // if not warn the user and don't proceed
                    const addressWithBilling = this.addressList().filter((a) => a.type != 'SHIPPING');

                    if (addressWithBilling.length > 2) {
                        this.HttpCustomerService.deleteAddress(addressId).subscribe({
                            next: () => {
                                this.addressList.update((arr) => arr.filter(a => a.id != addressId));
                                this.snackBarService.open("Address deleted successfully!");
                            }
                        })
                    } else {
                        const warnDialog = this.dialogService.open(InfoDialog, {
                            data: { title: "Cannot delete address", body: "This is your last billing address, thefore you cannot delete it. You might add another billing address and then proceed with the deletion of this one." }
                        });
                    }

                }
            }
        });

    }

    newAddress(): void {

        const addressDialog = this.dialogService.open(AddressForm, {
            data: { address: undefined }
        });

        addressDialog.afterClosed().subscribe({
            next: (value: SimpleAddress | undefined) => {
                if (value) {
                    this.HttpCustomerService.createAddress(value).subscribe({
                        next: (res) => {
                            this.addressList.update(list => [...list, res]);
                            this.snackBarService.open("Address added successfully!")
                        }
                    });
                }
            }
        })
    }

    updateAddress(address: IdentifiedAddress): void {

        // destructuring, creates a copy without the key (very weird syntax)
        const { id, ...updated } = address

        const addressDialog = this.dialogService.open(AddressForm, {
            data: { address: updated }
        });

        addressDialog.afterClosed().subscribe({
            next: (value: SimpleAddress | undefined) => {
                if (value) {
                    const toUpdate: PatchableAddreess = Object.assign({ id: id }, value);
                    this.HttpCustomerService.patchAddress(toUpdate).subscribe({
                        next: () => {

                            // updates the signal with the updated address
                            this.addressList.update(list =>
                                list.map(adr => (adr.id === toUpdate.id ? toUpdate as IdentifiedAddress : adr))
                            );

                            this.snackBarService.open("Address updated successfully!");
                        }
                    })
                }
            }
        })

    }

}
