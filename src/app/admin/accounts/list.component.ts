import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ standalone: false, templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    accounts?: any[];

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        console.log('🚀 ListComponent ngOnInit: calling accountService.getAll()');
        this.accountService.getAll()
            .pipe(first())
            .subscribe({
                next: accounts => {
                    console.log('✅ ListComponent received accounts:', accounts);
                    this.accounts = accounts;
                },
                error: err => {
                    console.error('❌ ListComponent getAll error:', err);
                }
            });
    }

    deleteAccount(id: string) {
        const account = this.accounts!.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts!.filter(x => x.id !== id)
            });
    }
}
