import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentifiedAddress } from '../models/IdentifiedAddress';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResourceEnum } from '../enums/ResourceEnum';
import { PatchableAddreess } from '../models/PatchableAddreess';
import { SimpleAddress } from '../models/SimpleAddress';

@Service()
export class HttpAddressService {

    private readonly httpClient: HttpClient = inject(HttpClient);

    private readonly BASE_URL: string = `${environment.httpApiUrl}/` +
                                        `${ResourceEnum.CUSTOMER}/` +
                                        `${ResourceEnum.ME}/` +
                                        `${ResourceEnum.ADDRESS}`
    ;

    getAddressList(): Observable<IdentifiedAddress[]> {
        console.log(this.BASE_URL)
        return this.httpClient.get<IdentifiedAddress[]>(this.BASE_URL);
    }

    patchAddress(address: PatchableAddreess): Observable<void> {
        return this.httpClient.patch<void>(`${this.BASE_URL}/${address.id}`, address);
    }

    deleteAddress(addressId: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.BASE_URL}/${addressId}`);
    }

    createAddress(address: SimpleAddress): Observable<IdentifiedAddress> {
        return this.httpClient.post<IdentifiedAddress>(this.BASE_URL, address);
    }
}
