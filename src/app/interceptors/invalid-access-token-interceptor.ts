import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, concatMap, Observable, of, tap, throwError } from 'rxjs';
import { HttpErrorEnum } from '../enums/HttpErrorEnum';
import { CredentialHttpService } from '../services/credential-http-service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { HttpResponseErrorBody } from '../models/HttpResponseErrorBody';

/**
 * Interceptor that verifies if the response of a failed http request is of type
 * `invalid_token`, which means the access token is either invalid or missing.
 *
 * If this happens the interceptor will request a new access token using the
 * refresh token and try to perform the original request again.
 */
export const invalidAccessTokenInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn) => {

    const credentialHttpService: CredentialHttpService = inject(CredentialHttpService);
    const authService: AuthService = inject(AuthService);

    return next(req).pipe(

        catchError((errorResponse: HttpErrorResponse) => {

            // check if the response body says the token is invalid
            const body: HttpResponseErrorBody = errorResponse.error as HttpResponseErrorBody;

            if (body.error === HttpErrorEnum.ACCESS_TOKEN_INVALID) {

                console.info("A " + HttpErrorEnum.ACCESS_TOKEN_INVALID +
                " error happened. A new access token will be requested using the refresh token.");

                // 1. request a new access token
                return credentialHttpService.refreshAccessToken().pipe(
                    concatMap((response) => {

                        // initiate a session
                        authService.initiateSession(response.token);

                        // retry the original request
                        return next(req);
                    })
                )

            }

            // if not then rethrow the same error again (propagate using rxjs)
            return throwError(() => errorResponse);
        })

    );
};
