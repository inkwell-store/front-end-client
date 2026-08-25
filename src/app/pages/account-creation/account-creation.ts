import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CredentialHttpService } from '../../services/credential-http-service';
import { Credential } from '../../models/Credential';
import { RouterLink } from "@angular/router";
import {MatDividerModule} from '@angular/material/divider';
import { AuthService } from '../../services/auth-service';


@Component({
    selector: 'app-account-creation',
    imports: [MatDividerModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatProgressSpinnerModule, RouterLink],
    templateUrl: './account-creation.html',
    styleUrl: './account-creation.css',
})
export class AccountCreation {

    private readonly httpService: CredentialHttpService = inject(CredentialHttpService);
    private readonly authService: AuthService = inject(AuthService);

    showSpinner: boolean = false;

    registrationForm: FormGroup = new FormGroup({
        email: new FormControl('test@gmail.com', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('test@gmail.com', [
            Validators.required,
            Validators.minLength(8)
        ])
    });

    requestAccountCreation(): void {

        if (this.registrationForm.valid) {
            this.showSpinner = true;

            let credential: Credential = this.registrationForm.value as Credential;
            this.httpService.registerCredential(credential).subscribe({
                next: (response) => {
                    this.showSpinner = false;
                    this.authService.initiateSession(response.token);
                },
                error: (err) => { console.log(err) }

            });
        }

    }

    clearForm(): void {
        this.registrationForm.reset();
        this.showSpinner = false;
    }
}
