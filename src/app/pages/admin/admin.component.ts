import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from 'src/app/modules/core/_services';
import { User } from 'src/app/modules/core/_models';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
