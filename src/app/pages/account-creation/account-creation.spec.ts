import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreation } from './account-creation';

describe('AccountCreation', () => {
    let component: AccountCreation;
    let fixture: ComponentFixture<AccountCreation>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccountCreation],
        }).compileComponents();

        fixture = TestBed.createComponent(AccountCreation);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
