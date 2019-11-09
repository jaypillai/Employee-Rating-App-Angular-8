import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EmployeesListPageComponent} from './employee-list-page.component';
import {configureTestSuite} from 'ng-bullet';
import {LoadingPlaceholderComponent} from '../../../../shared/components/loading-placeholder/loading-placeholder.component';
import {EmployeeService} from '../../shared/employee.service';
import {Employee} from '../../shared/employee.model';
import {of} from 'rxjs';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeRemoveComponent} from '../../components/employee-remove/employee-remove.component';
import {Router} from '@angular/router';
import {MockComponent, MockModule} from 'ng-mocks';
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxScrollToFirstInvalidModule} from '@ismaestro/ngx-scroll-to-first-invalid';
import {RouterTestingModule} from '@angular/router/testing';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {ROUTES_CONFIG, RoutesConfig} from '../../../../configs/routes.config';
import {CookieService} from 'ngx-cookie';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('EmployeesListPageComponent', () => {
  let component: EmployeesListPageComponent;
  let fixture: ComponentFixture<EmployeesListPageComponent>;
  let router: Router;
  let navigateSpy;

  const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss']);
  const employeeServiceSpy = jasmine.createSpyObj('EmployeeService',
    ['checkIfUserCanVote', 'createEmployee', 'getEmployees', 'updateEmployee', 'deleteEmployee', 'showSnackBar']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MockModule(NgxScrollToFirstInvalidModule)
      ],
      declarations: [
        MockComponent(EmployeeRemoveComponent),
        MockComponent(LoadingPlaceholderComponent),
        EmployeesListPageComponent
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: MatDialog, useValue: matDialogSpy},
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {
          provide: I18n, useValue: () => {
          }
        },
        {provide: ROUTES_CONFIG, useValue: RoutesConfig},
        {
          provide: CookieService, useValue: {
            get: (key) => key,
            put: () => true,
          }
        }
      ]
    });
  });

  beforeEach(() => {
    employeeServiceSpy.checkIfUserCanVote.and.returnValue(true);
    fixture = TestBed.createComponent(EmployeesListPageComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    navigateSpy = spyOn(router, 'navigate');
    employeeServiceSpy.getEmployees.and.returnValue(of([new Employee({is: 1, name: 'employee test'})]));
    fixture.detectChanges();
  });

  it('should create component and load employeees', (() => {
    expect(component).toBeTruthy();
    expect(component.employeees.length).toBe(1);
    expect(component.employeees[0].name).toBe('employee test');
  }));

  it('should create new employee success', (() => {
    const success = new Promise((resolve) => {
      resolve('asd');
    });
    employeeServiceSpy.createEmployee.and.returnValue(success);
    component.newEmployeeForm = new FormGroup({
      name: new FormControl('new employee!', [Validators.required, Validators.maxLength(30)]),
      alterEgo: new FormControl('haha', [Validators.required, Validators.maxLength(30)])
    });

    component.error = null;
    component.createNewEmployee();
    expect(component.error).toBe(null);
  }));

  it('should create new employee error', (async () => {
    const error = new Promise((resolve, reject) => {
      reject();
    });
    employeeServiceSpy.createEmployee.and.returnValue(error);
    component.newEmployeeForm = new FormGroup({
      name: new FormControl('new employee!', [Validators.required, Validators.maxLength(30)]),
      alterEgo: new FormControl('haha', [Validators.required, Validators.maxLength(30)])
    });

    component.error = false;
    await component.createNewEmployee();
    expect(component.error).toBe(true);
  }));

  it('should like a employee', (() => {
    const employee = new Employee({likes: 0});
    component.like(employee);
    expect(employee.likes).toBe(1);
  }));

  it('should delete a employee', (() => {
    const employee = new Employee({id: 'testId'});
    matDialogSpy.open.and.returnValue({
      afterClosed: () => {
        return of(true);
      }
    });
    employeeServiceSpy.deleteEmployee.and.returnValue(new Promise(() => true));
    component.deleteEmployee(employee);
    expect(employeeServiceSpy.deleteEmployee).toHaveBeenCalledWith('testId');
  }));
});
