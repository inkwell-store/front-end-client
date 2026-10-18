import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    imports: [MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule],
    templateUrl: './confirmation-dialog.html',
    styleUrl: './confirmation-dialog.css',
})
export class ConfirmationDialog {

    private readonly dialogRef = inject(MatDialogRef);

    readonly data = inject<{ title?: string, body?: string }>(MAT_DIALOG_DATA);

    onConfirm(): void {
        this.dialogRef.close('CONFIRM');
    }

    onCancel(): void {
        this.dialogRef.close('CANCEL');
    }
}
