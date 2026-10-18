import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResourceEnum } from '../enums/ResourceEnum';

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {

    const authService: AuthService = inject(AuthService);
    const token: string | null = authService.getJwtTokenAsString();
    const BASE_URL: string = `${environment.httpApiUrl}`;

    const publicEndpoints: string[] = [
        `${BASE_URL}/${ResourceEnum.AUTH}/${ResourceEnum.LOGIN}`,
        `${BASE_URL}/${ResourceEnum.AUTH}/${ResourceEnum.REGISTER_ACCOUNT}`,
        `${BASE_URL}/${ResourceEnum.AUTH}/${ResourceEnum.REFRESH}`,
    ];

    // console.log(publicEndpoints);

    // exclude token addition for public endpoints:
    if (publicEndpoints.includes(req.url)) {
        return next(req);
    } else {
        const newRequest = req.clone({
            setHeaders: {
                // if the token is absent sending null will trigger the appropriate error response, which is ok
                Authorization: `Bearer ${authService.getJwtTokenAsString()}`
            }
        });

        return next(newRequest);
    }

};
