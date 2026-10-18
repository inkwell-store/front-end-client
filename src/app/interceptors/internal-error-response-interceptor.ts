import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { HttpResponseErrorBody } from '../models/HttpResponseErrorBody';
import { HttpErrorEnum } from '../enums/HttpErrorEnum';
import { InternalServerErrorInfo } from '../components/internal-server-error-info/internal-server-error-info';

export const internalErrorResponseInterceptor: HttpInterceptorFn = (req, next) => {

    const dialogService: MatDialog = inject(MatDialog);

    return next(req).pipe(
        catchError((errorResponse: HttpErrorResponse) => {

            const body: HttpResponseErrorBody = errorResponse.error as HttpResponseErrorBody;

            if (body.error === HttpErrorEnum.INTERNAL_SERVER_ERROR) {

                // 1. inform the user the there was a problem with the server.
                const dialogRef = dialogService.open(InternalServerErrorInfo, {
                    hasBackdrop: true
                })

                dialogRef.afterClosed().subscribe({
                    // I can then continue the chain and let the component handle anything else.
                    next: () => throwError(() => errorResponse)
                });
            }

            return throwError(() => errorResponse);

        })
    );
};
