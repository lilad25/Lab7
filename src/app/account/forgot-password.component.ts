import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ standalone: false, templateUrl: 'forgot-password.component.html' })
export class ForgotPasswordComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.forgotPassword(this.f.email.value)
            .pipe(first())
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: (res: any) => {
                    this.alertService.success('Please check your email for password reset instructions');
                    if (res && res.resetLink) {
                        setTimeout(() => {
                            this.alertService.info(`
                                <h4>Reset Password Email</h4>
                                <p>Please click the below link to reset your password:</p>
                                <p><a href="${res.resetLink}">${res.resetLink}</a></p>
                                <div><strong>NOTE:</strong> The API returned this link so you can test without SMTP configured.</div>
                            `, { autoClose: false });
                        });
                    }
                },
                error: error => this.alertService.error(error)
            });
    }
}
