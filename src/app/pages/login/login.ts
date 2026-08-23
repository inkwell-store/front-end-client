import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CredentialHttpService } from '../../services/credential-http-service';
import { Credential } from '../../models/Credential';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-login',
    imports: [MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatProgressSpinnerModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {

    private readonly httpService: CredentialHttpService = inject(CredentialHttpService);

    showSpinner: boolean = false;

    loginFormGroup: FormGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ])
    });

    requestLogin(): void {

        if (this.loginFormGroup.valid) {
            console.log("form valid")
            let credential: Credential = this.loginFormGroup.value as Credential;

            this.httpService.loginCredential(credential).subscribe({
                next: (response) => {
                    console.log("login successful with response: " + response)
                    // call the service to initiate session and redirect to home
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
