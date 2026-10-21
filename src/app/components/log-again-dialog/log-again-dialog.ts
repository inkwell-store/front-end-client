import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Login } from '../../pages/login/login';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-log-again-dialog',
    imports: [MatDialogContent, MatDialogActions, MatDialogTitle, MatButton],
    templateUrl: './log-again-dialog.html',
    styleUrl: './log-again-dialog.css',
})
export class LogAgainDialog {

    private readonly dialogRef = inject(MatDialogRef);

    onClose() {
        this.dialogRef.close();
    }

}
