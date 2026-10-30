import { Component, inject, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth-service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { HttpCustomerService } from '../../services/http-customer-service';
import { ProfileProperties } from '../../models/customer-profile-models';
import { UserProfileImagePipe } from '../../pipes/user-profile-image-pipe';
import { CredentialHttpService } from '../../services/credential-http-service';

@Component({
    selector: 'app-main-nav-bar',
    imports: [MatIconModule, RouterLink, MatIcon, MatMenuModule, MatDivider, UserProfileImagePipe],
    templateUrl: './main-nav-bar.html',
    styleUrl: './main-nav-bar.css',
})
export class MainNavBar implements OnInit, OnDestroy {

    private readonly authService: AuthService = inject(AuthService);
    private readonly httpCustomerService: HttpCustomerService = inject(HttpCustomerService);
    private readonly credentialHttpService: CredentialHttpService = inject(CredentialHttpService);
    private readonly routerService: Router = inject(Router);

    readonly navItems = [
        { name: "Home", path: "home" },
        // { name: "Dashboard", path: "dashboard" }
    ];

    userAuthenticated: WritableSignal<boolean> = signal<boolean>(false);
    userPhoto: WritableSignal<string | undefined | null> = signal(undefined);
    userEmail: WritableSignal<string | undefined | null> = signal(undefined);

    authSubscription: Subscription = Subscription.EMPTY;

    ngOnInit(): void {

        // request only the customer's photo and email
        const profileAttributes: ProfileProperties[] = [
            ProfileProperties.EMAIL, ProfileProperties.PHOTO
        ];

        this.httpCustomerService.getProfile(profileAttributes).subscribe({
            next: (res) => {
                this.userPhoto.set(res.photo);
                this.userEmail.set(res.email);
                console.log(res)
            }
        });

        this.authSubscription = this.authService.isAuthenticatedAsObservable().subscribe({
            next: (value) => this.userAuthenticated.set(value)
        });
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
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
