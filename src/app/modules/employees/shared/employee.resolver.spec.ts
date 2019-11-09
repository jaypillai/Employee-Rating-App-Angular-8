import {TestBed} from '@angular/core/testing';
import {EmployeeService} from './employee.service';
import {configureTestSuite} from 'ng-bullet';
import {EmployeeResolver} from './employee.resolver';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {Employee} from './employee.model';
import {of} from 'rxjs';

describe('EmployeeResolver', () => {
  let employeeResolver: EmployeeResolver;
  let route: ActivatedRoute;

  const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployee']);
  const employeeId = '123';

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: employeeId})}}
        },
        EmployeeResolver
      ]
    });
  });

  beforeEach(() => {
    employeeResolver = TestBed.get(EmployeeResolver);
    route = TestBed.get(ActivatedRoute);
  });

  it('should resolve a employee by id', (() => {
    employeeServiceSpy.getEmployee.and.returnValue(of(new Employee({id: employeeId})));
    employeeResolver.resolve(route.snapshot).subscribe((employee) => {
      expect(employee.id).toBe(employeeId);
    });
  }));
});
