import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential } from '../models/Credential';
import { JwtTokenResponse } from '../models/JwtTokenResponse';

@Service()
export class CredentialHttpService {

    private readonly httpClient: HttpClient = inject(HttpClient);

    private readonly BASE_URL: string = "http://localhost:8081/api/auth/";

    /**
     * Calls the Authorization Service to request a jwt token for a given pair of credentials.
     * If the login is successful then a jwt token is returned and a
     * refresh token is added to a httpOnly cookie.
     *
     * @param credential is the of crendetials
     * @returns JwtTokenResponse
     */
    loginCredential(credential: Credential): Observable<JwtTokenResponse> {
        return this.httpClient.post<JwtTokenResponse>(this.BASE_URL + "login", credential);
    }

    /**
     * Calls the Authorization Service to to register a new set of Credentials.
     * If the registration is successful then a jwt token is returned and a refresh token
     * is added to a httpOnly cookie.
     *
     * @param credential is the of crendetials
     * @returns JwtTokenResponse a json object with a jwt token
     */
    registerCredential(credential: Credential): Observable<JwtTokenResponse> {
        return this.httpClient.post<JwtTokenResponse>(this.BASE_URL + "create-account", credential);
    }

}
