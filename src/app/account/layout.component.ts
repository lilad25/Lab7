import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/_services';

@Component({ standalone: false, templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // redirect to home if already logged in, unless accessing password recovery
        if (this.accountService.accountValue) {
            if (!this.router.url.includes('forgot-password') && !this.router.url.includes('reset-password')) {
                this.router.navigate(['/']);
            }
        }
    }
}
