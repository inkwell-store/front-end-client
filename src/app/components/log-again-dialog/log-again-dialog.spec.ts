import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAgainDialog } from './log-again-dialog';

describe('LogAgainDialog', () => {
    let component: LogAgainDialog;
    let fixture: ComponentFixture<LogAgainDialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LogAgainDialog],
        }).compileComponents();

        fixture = TestBed.createComponent(LogAgainDialog);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
