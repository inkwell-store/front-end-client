import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';
import { invalidAccessTokenInterceptor } from './interceptors/invalid-access-token-interceptor';
import { failedRefreshAccessTokenInterceptor } from './interceptors/failed-refresh-access-token-interceptor';
import { internalErrorResponseInterceptor } from './interceptors/internal-error-response-interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
    providers: [
        DatePipe,
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(

            withInterceptors([
                invalidAccessTokenInterceptor,
                failedRefreshAccessTokenInterceptor,
                internalErrorResponseInterceptor,

                // Here the auth interceptor that attaches the access token to the request must come
                // AFTER the `invalidAccessTokenInterceptor`. It should be ordered like this because
                // if an invalid_access_token error happens the `invalidAccessTokenInterceptor` requests
                // a new access token and retries the original, failed request. If the authInterceptor
                // comes before it then the new access token might not be attached to the retried request.
                authInterceptor,
            ])
        ),
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } }
    ]
};
