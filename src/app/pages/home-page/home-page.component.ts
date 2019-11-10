import {Component, OnInit} from '@angular/core';
import {Employee} from '../../modules/employees/shared/employee.model';
import {EmployeeService} from '../../modules/employees/shared/employee.service';
import {AppConfig} from '../../configs/app.config';
import {Observable} from 'rxjs';
import {defaultIfEmpty, map} from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/_services';
import { User, Role } from 'src/app/modules/core/_models';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
    employeees$: Observable<Employee[]>;
    currentUser: User;

    constructor(private employeeService: EmployeeService,
                private authenticationService: AuthenticationService, ) {
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {

        this.employeees$ = this.employeeService.getEmployees().pipe(
        map((employeees) => {
            if (this.currentUser && this.currentUser.role === Role.Admin) {
                return employeees.slice(0, AppConfig.topEmployeesLimit);
            } else {
                return employeees.slice(0, 2);
            }
        }),
        defaultIfEmpty([])
        );
    }
}
