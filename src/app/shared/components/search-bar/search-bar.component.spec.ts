import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchBarComponent} from './search-bar.component';
import {EmployeeService} from '../../../modules/employees/shared/employee.service';
import {Employee} from '../../../modules/employees/shared/employee.model';
import {of} from 'rxjs';
import {configureTestSuite} from 'ng-bullet';
import {MockPipe} from 'ng-mocks';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {CapitalizeFirstPipe} from '../../pipes/capitalize-first.pipe';
import {ROUTES_CONFIG, RoutesConfig} from '../../../configs/routes.config';
import {MatInputModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployees']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        MockPipe(CapitalizeFirstPipe),
        SearchBarComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: ROUTES_CONFIG, useValue: RoutesConfig}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.debugElement.componentInstance;
    employeeServiceSpy.getEmployees.and.returnValue(of([new Employee({name: 'test1', default: true})]));
    fixture.detectChanges();
  });

  it('should create employee search component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should filter employeees array', (() => {
    component.defaultEmployees = [
      new Employee({id: 1, name: 'batman', default: false}),
      new Employee({id: 2, name: 'spiderman', default: false})
    ];
    expect(component.filterEmployees('batman').length).toBe(1);
    expect(component.filterEmployees('').length).toBe(2);
  }));
});
