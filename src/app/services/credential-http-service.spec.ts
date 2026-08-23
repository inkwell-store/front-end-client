import { TestBed } from '@angular/core/testing';

import { CredentialHttpService } from './credential-http-service';

describe('CredentialHttpService', () => {
    let service: CredentialHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CredentialHttpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
