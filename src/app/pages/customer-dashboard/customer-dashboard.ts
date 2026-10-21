import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

@Component({
    selector: 'app-customer-dashboard',
    imports: [RouterOutlet, MatButtonModule, MatIcon, RouterLink, NgTemplateOutlet, MatListModule, RouterLinkActive, MatRippleModule],
    templateUrl: './customer-dashboard.html',
    styleUrl: './customer-dashboard.css',
})
export class CustomerDashboard {

    readonly navItems: navigationItem[] = [
        { name: "Profile", link: "profile", iconName: "account_circle" },
        { name: "Addresses", link: "addresses", iconName: "home_work" }
    ]

}

interface navigationItem {
    name: string;
    link: string;
    iconName: string;
}
