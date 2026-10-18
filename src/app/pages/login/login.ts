import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CredentialHttpService } from '../../services/credential-http-service';
import { Credential } from '../../models/Credential';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';


@Component({
    selector: 'app-login',
    imports: [RouterLink, MatDividerModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatProgressSpinnerModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login implements OnInit {

    private readonly httpService: CredentialHttpService = inject(CredentialHttpService);
    private readonly authService: AuthService = inject(AuthService);
    private readonly routerService: Router = inject(Router);
    private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

    private redirectToAfterLogin: string | null = null;

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

    ngOnInit(): void {
        this.redirectToAfterLogin = this.activatedRoute.snapshot.queryParamMap.get('redirectTo');
    }

    requestLogin(): void {

        if (this.loginFormGroup.valid) {

            let credential: Credential = this.loginFormGroup.value as Credential;

            this.httpService.loginCredential(credential).subscribe({
                next: (response) => {
                    this.authService.initiateSession(response.token);

                    // then I redirect the user to home page or from his original url
                    if (this.redirectToAfterLogin === null) {
                        this.routerService.navigateByUrl("home");
                    } else {
                        this.routerService.navigateByUrl(this.redirectToAfterLogin);
                    }
                }
            })

        }

    }

    clearForm(): void {
        this.loginFormGroup.reset();
    }

}
