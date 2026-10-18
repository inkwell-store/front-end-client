import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-customer-dashboard',
    imports: [RouterOutlet, MatButtonModule, MatIcon, RouterLink, NgTemplateOutlet],
    templateUrl: './customer-dashboard.html',
    styleUrl: './customer-dashboard.css',
})
export class CustomerDashboard {



}
