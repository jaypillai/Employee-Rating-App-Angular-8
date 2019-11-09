import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Employee} from './employee.model';
import {Observable} from 'rxjs';
import {EmployeeService} from './employee.service';

@Injectable()
export class EmployeeResolver implements Resolve<Observable<Employee>> {
  constructor(private employeeService: EmployeeService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.employeeService.getEmployee(route.paramMap.get('id'));
  }
}
