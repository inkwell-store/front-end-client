import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
    selector: 'app-info-dialog',
    imports: [MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule],
    templateUrl: './info-dialog.html',
    styleUrl: './info-dialog.css',
})
export class InfoDialog {

    private readonly dialogRef = inject(MatDialogRef);
    readonly data = inject<{ title?: string, body?: string }>(MAT_DIALOG_DATA);

    onClose(): void {
        this.dialogRef.close();
    }

}
