import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavBar } from './main-nav-bar';

describe('MainNavBar', () => {
    let component: MainNavBar;
    let fixture: ComponentFixture<MainNavBar>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MainNavBar],
        }).compileComponents();

        fixture = TestBed.createComponent(MainNavBar);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
