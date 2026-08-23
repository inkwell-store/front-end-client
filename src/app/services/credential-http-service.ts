import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential } from '../models/Credential';
import { JwtTokenResponse } from '../models/JwtTokenResponse';

@Service()
export class CredentialHttpService {

    private readonly httpClient: HttpClient = inject(HttpClient);

    loginCredential(credential: Credential): Observable<JwtTokenResponse> {
        return this.httpClient.post<JwtTokenResponse>("http://localhost:8081/api/auth/login", credential);
    }


}
