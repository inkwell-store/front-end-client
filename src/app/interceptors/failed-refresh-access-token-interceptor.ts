import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { HttpResponseErrorBody } from '../models/HttpResponseErrorBody';
import { HttpErrorEnum } from '../enums/HttpErrorEnum';
import { MatDialog } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { LogAgainDialog } from '../components/log-again-dialog/log-again-dialog';
import { Router } from '@angular/router';

/**
 * Interceptor that verifies if the response of a failed http request is of type
 * `invalid_refresh_token`, which means the refresh token is either missing or invalid.
 *
 * If this happens then the interceptor will inform the user they need to start a new
 * authenticatoin flow.
 */
export const failedRefreshAccessTokenInterceptor: HttpInterceptorFn = (req, next) => {

    const dialogService: MatDialog = inject(MatDialog);
    const routerService: Router = inject(Router)

    return next(req).pipe(
        catchError((response: HttpErrorResponse) => {

            const body: HttpResponseErrorBody = response.error as HttpResponseErrorBody;

            if (body.error === HttpErrorEnum.INVALID_REFRESH_TOKEN) {
                // 1. inform the user he needs to login again
                const dialog = dialogService.open(LogAgainDialog);

                dialog.afterClosed().subscribe({
                    next: () => {
                        routerService.navigate(['login'], {
                            // queryParams: {
                            //     redirectTo: 'https://other-app.example.com'
                            // }
                        });
                    }
                })
            }

            // if the error is not a an invalid token continue the chain
            return throwError(() => response)
        })
    )
};
