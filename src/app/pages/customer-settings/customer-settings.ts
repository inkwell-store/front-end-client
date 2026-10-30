import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { CredentialHttpService } from '../../services/credential-http-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ProfileProperties } from '../../models/customer-profile-models';
import { HttpCustomerService } from '../../services/http-customer-service';

@Component({
    selector: 'app-customer-settings',
    imports: [MatIcon, MatFabButton, MatDivider],
    templateUrl: './customer-settings.html',
    styleUrl: './customer-settings.css',
})
export class CustomerSettings implements OnInit {

    private readonly credentialHttpService: CredentialHttpService = inject(CredentialHttpService);
    private readonly httpCustomerService: HttpCustomerService = inject(HttpCustomerService)
    private readonly authService: AuthService = inject(AuthService);
    private readonly routerService: Router = inject(Router);

    userEmail: WritableSignal<string | undefined | null> = signal(undefined);

    ngOnInit(): void {
        const attributes: ProfileProperties[] = [
            ProfileProperties.EMAIL
        ];

        this.httpCustomerService.getProfile(attributes).subscribe({
            next: (res) => {
                this.userEmail.set(res.email);
            }
        });

    }

    logout(): void {

        this.credentialHttpService.logout().subscribe({
            next: () => {
                this.authService.clearSession();
                this.routerService.navigateByUrl("home");
            }
        })

    }

}
