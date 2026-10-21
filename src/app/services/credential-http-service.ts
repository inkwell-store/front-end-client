import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential } from '../models/Credential';
import { JwtTokenResponse } from '../models/JwtTokenResponse';
import { environment } from '../../environments/environment';
import { ResourceEnum } from '../enums/ResourceEnum';

@Service()
export class CredentialHttpService {

    private readonly httpClient: HttpClient = inject(HttpClient);

    private readonly BASE_URL: string = `${environment.httpApiUrl}/${ResourceEnum.AUTH}/`;

    /**
     * Calls the Authorization Service to request a jwt token for a given pair of credentials.
     * If the login is successful then a jwt token is returned and a refresh token is added to
     * a httpOnly cookie.
     *
     * @param credential is the of crendetials
     * @returns JwtTokenResponse with a jwt
     */
    loginCredential(credential: Credential): Observable<JwtTokenResponse> {
        return this.httpClient.post<JwtTokenResponse>(this.BASE_URL + "login", credential, { withCredentials: true });
    }

    /**
     * Calls the Authorization Service to register a new set of Credentials.
     * If the registration is successful then a jwt token is returned and a refresh token
     * is added to a httpOnly cookie.
     *
     * @param credential is the of crendetials
     * @returns JwtTokenResponse a json object with a jwt token
     */
    registerCredential(credential: Credential): Observable<JwtTokenResponse> {
        return this.httpClient.post<JwtTokenResponse>(this.BASE_URL + "create-account", credential);
    }

    /**
     * Calls the Authorization Service to request a new jwt-access-token using the refresh token
     * stored in the httpOnly cookie.
     *
     * @returns JwtTokenResponse
     */
    refreshAccessToken(): Observable<JwtTokenResponse> {
        // The refresh token is stored in a secure http-only cookie, so the browser will attach
        // it to the request automatically. This is important, because POST is the adequate http
        // method to use, but the body in this case in null.
        return this.httpClient.post<JwtTokenResponse>(`${this.BASE_URL}${ResourceEnum.REFRESH}`, null, { withCredentials: true });
    }

    logout(): Observable<void> {
        return this.httpClient.post<void>(this.BASE_URL + ResourceEnum.LOGOUT, null, { withCredentials: true });
    }

}
