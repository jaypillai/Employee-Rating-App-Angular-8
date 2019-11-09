import {map, startWith} from 'rxjs/operators';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Employee} from '../../../modules/employees/shared/employee.model';
import {EmployeeService} from '../../../modules/employees/shared/employee.service';
import {ROUTES_CONFIG} from '../../../configs/routes.config';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  defaultEmployees: Array<Employee>;
  employeeFormControl: FormControl;
  filteredEmployees: any;

  constructor(private employeeService: EmployeeService,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.defaultEmployees = [];
    this.employeeFormControl = new FormControl();
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((employeees: Array<Employee>) => {
      this.defaultEmployees = employeees;

      this.employeeFormControl.valueChanges.pipe(
        startWith(null as string),
        map(value => this.filterEmployees(value)))
        .subscribe(employeeesFiltered => {
          this.filteredEmployees = employeeesFiltered;
        });
    });
  }

  filterEmployees(val: string): Employee[] {
    return val ? this.defaultEmployees.filter(employee => employee.name.toLowerCase().indexOf(val.toLowerCase()) === 0 )
      : this.defaultEmployees;
  }
}
