import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CredentialHttpService } from '../../services/credential-http-service';
import { Credential } from '../../models/Credential';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';


@Component({
    selector: 'app-login',
    imports: [RouterLink, MatDividerModule,MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatProgressSpinnerModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {

    private readonly httpService: CredentialHttpService = inject(CredentialHttpService);
    private readonly authService: AuthService = inject(AuthService);

    showSpinner: boolean = false;

    loginFormGroup: FormGroup = new FormGroup({
        email: new FormControl('wilsondbarbosa@gmail.com', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('wilsondbarbosa@gmail.com', [
            Validators.required,
            Validators.minLength(8)
        ])
    });

    requestLogin(): void {

        if (this.loginFormGroup.valid) {

            let credential: Credential = this.loginFormGroup.value as Credential;

            this.httpService.loginCredential(credential).subscribe({
                next: (response) => {
                    console.log("login successful with response: " + response.token)
                    this.authService.initiateSession(response.token);
                },
                error: (err) => {
                    console.log(err);
                    this.showSpinner = false;
                }
            })

        }

    }

    clearForm(): void {
        this.loginFormGroup.reset();
    }

}
