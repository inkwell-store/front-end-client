import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const authService: AuthService = inject(AuthService);

    const newRequest = req.clone({
        setHeaders: {
            // TODO the method here can return null if the no local session
            // is set, which would create an invalid token. I wonder if there's
            // a better pattern for this
            Authorization: `Bearer ${authService.getJwtTokenAsString()}`
        }
    });

    return next(req);
};
