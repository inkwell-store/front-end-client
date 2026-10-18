import { TestBed } from '@angular/core/testing';

import { HttpAddressService } from './http-address-service';

describe('HttpAddressService', () => {
    let service: HttpAddressService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HttpAddressService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
