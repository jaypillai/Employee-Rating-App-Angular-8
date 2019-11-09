import {Component, OnInit} from '@angular/core';
import {Employee} from '../../modules/employees/shared/employee.model';
import {EmployeeService} from '../../modules/employees/shared/employee.service';
import {AppConfig} from '../../configs/app.config';
import {Observable} from 'rxjs';
import {defaultIfEmpty, map} from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  employeees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeees$ = this.employeeService.getEmployees().pipe(
      map((employeees) => employeees.slice(0, AppConfig.topEmployeesLimit)),
      defaultIfEmpty([])
    );
  }
}
