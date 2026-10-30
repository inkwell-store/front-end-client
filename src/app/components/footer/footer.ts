import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-footer',
    imports: [MatIcon],
    templateUrl: './footer.html',
    styleUrl: './footer.css',
})
export class Footer {

    private readonly matIconRegistry = inject(MatIconRegistry);
    private readonly sanitizer = inject(DomSanitizer);

    readonly currentYear: number = new Date().getFullYear();

    constructor() {
        this.matIconRegistry.addSvgIcon(
            'github', this.sanitizer.bypassSecurityTrustResourceUrl("GitHub_Invertocat_White.svg"))
    }
}
