import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ standalone: false, templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    accounts?: any[];

    constructor(
        private accountService: AccountService,
        private cdr: ChangeDetectorRef,
        private zone: NgZone
    ) { }

    ngOnInit() {
        console.log('🚀 ListComponent ngOnInit: calling accountService.getAll()');
        this.accountService.getAll()
            .pipe(first())
            .subscribe({
                next: accounts => {
                    console.log('✅ ListComponent received accounts:', accounts);
                    this.zone.run(() => {
                        this.accounts = accounts;
                        this.cdr.detectChanges();
                    });
                },
                error: err => {
                    console.error('❌ ListComponent getAll error:', err);
                }
            });
    }

    deleteAccount(id: string) {
        const account = this.accounts!.find(x => x.id === id);
        this.zone.run(() => {
            account.isDeleting = true;
            this.cdr.detectChanges();
        });
        this.accountService.delete(id)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.zone.run(() => {
                        this.accounts = this.accounts!.filter(x => x.id !== id);
                        this.cdr.detectChanges();
                    });
                },
                error: err => {
                    console.error('❌ delete error:', err);
                    this.zone.run(() => {
                        account.isDeleting = false;
                        this.cdr.detectChanges();
                    });
                }
            });
    }
}
