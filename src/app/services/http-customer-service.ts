import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentifiedAddress } from '../models/IdentifiedAddress';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResourceEnum } from '../enums/ResourceEnum';
import { PatchableAddreess } from '../models/PatchableAddreess';
import { SimpleAddress } from '../models/SimpleAddress';
import { Profile } from '../models/Profile';
import { PatchableProfile } from '../models/PatchableProfile';

@Service()
export class HttpCustomerService {

    private readonly httpClient: HttpClient = inject(HttpClient);

    private readonly BASE_URL: string = `${environment.httpApiUrl}/` +
                                        `${ResourceEnum.CUSTOMER}/` +
                                        `${ResourceEnum.ME}`
    ;

    getAddressList(): Observable<IdentifiedAddress[]> {
        return this.httpClient.get<IdentifiedAddress[]>(`${this.BASE_URL}/${ResourceEnum.ADDRESS}`);
    }

    patchAddress(address: PatchableAddreess): Observable<void> {
        return this.httpClient.patch<void>(`${this.BASE_URL}/${ResourceEnum.ADDRESS}/${address.id}`, address);
    }

    deleteAddress(addressId: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.BASE_URL}/${ResourceEnum.ADDRESS}/${addressId}`);
    }

    createAddress(address: SimpleAddress): Observable<IdentifiedAddress> {
        return this.httpClient.post<IdentifiedAddress>(`${this.BASE_URL}/${ResourceEnum.ADDRESS}`, address);
    }

    getProfile(): Observable<Profile> {
        return this.httpClient.get<Profile>(`${this.BASE_URL}/${ResourceEnum.PROFILE}`);
    }

    patchProfile(profile: PatchableProfile): Observable<Profile> {
        return this.httpClient.patch<Profile>(`${this.BASE_URL}/${ResourceEnum.PROFILE}`, profile);
    }

}
