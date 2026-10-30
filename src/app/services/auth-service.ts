import { inject, Service } from '@angular/core';
import { JwtCustomPayload } from '../models/JwtCustomPayload';
import { jwtDecode } from 'jwt-decode';
import { LocalSession } from '../models/LocalSession';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Service that handles authentication logic. It also manages a LocalSession object
 * where the valid credentials for a user are stored
 */
@Service()
export class AuthService {

    private session: LocalSession | null = null;
    private isUserAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private readonly WAS_USER_LOGGED: string = "WAS_USER_LOGGED";

    /**
     * Initiates a local session for the user.
     *
     * @param token the jwt string token
     */
    initiateSession(token: string): void {

        let decodedToken = jwtDecode(token) as JwtCustomPayload;

        // I could validate the token here, check for the issuer, exp and the like
        // but for simplicity I'll just assume the token is properly formatted and
        // valid, at least at this point.
        this.session = {
            token: token,
            roles: decodedToken.roles,
            exp: decodedToken.exp!
        }

        localStorage.setItem(this.WAS_USER_LOGGED, "true");

        this.isUserAuthenticated$.next(true);

        console.log("Authentication successful. A new local sesstion was created.");
    }

    getJwtTokenAsString(): string | null {
        return this.session === null ? null : this.session.token;
    }

    isUserAuthenticated(): boolean {
        return this.session === null;
    }

    clearSession(): void {
        this.session = null;
        this.isUserAuthenticated$.next(false);
        localStorage.removeItem(this.WAS_USER_LOGGED);
        console.log("local session terminated");
    }

    isAuthenticatedAsObservable(): BehaviorSubject<boolean> {
        return this.isUserAuthenticated$;
    }

    wasUserPreviouslyLogged(): boolean {
        const logged: string | null = localStorage.getItem(this.WAS_USER_LOGGED);
        return (logged === null || logged !== "true") ? false : true;
    }
}
