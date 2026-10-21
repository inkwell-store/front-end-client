import { Component, inject } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { CredentialHttpService } from '../../services/credential-http-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-settings',
    imports: [MatIcon, MatFabButton, MatDivider],
    templateUrl: './customer-settings.html',
    styleUrl: './customer-settings.css',
})
export class CustomerSettings {

    private readonly credentialHttpService: CredentialHttpService = inject(CredentialHttpService);
    private readonly authService: AuthService = inject(AuthService);
    private readonly routerService: Router = inject(Router);

    logout(): void {

        this.credentialHttpService.logout().subscribe({
            next: () => {
                this.authService.clearSession();
                this.routerService.navigateByUrl("home");
            }
        })

    }

}
