import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServerErrorInfo } from './internal-server-error-info';

describe('InternalServerErrorInfo', () => {
    let component: InternalServerErrorInfo;
    let fixture: ComponentFixture<InternalServerErrorInfo>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InternalServerErrorInfo],
        }).compileComponents();

        fixture = TestBed.createComponent(InternalServerErrorInfo);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
