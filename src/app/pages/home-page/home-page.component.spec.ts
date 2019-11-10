import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EmployeeService} from '../../modules/employees/shared/employee.service';
import {HomePageComponent} from './home-page.component';
import {of} from 'rxjs';
import {Employee} from '../../modules/employees/shared/employee.model';
import {configureTestSuite} from 'ng-bullet';
import {EmployeeLoadingComponent} from '../../shared/components/employee-loading/employee-loading.component';

import {LoadingPlaceholderComponent} from '../../shared/components/loading-placeholder/loading-placeholder.component';
import {MockComponent} from 'ng-mocks';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import { EmployeeCardComponent } from 'src/app/shared/components/employee-card/employee-card.component';
import { HttpClientModule } from '@angular/common/http';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployees']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientModule
      ],
      declarations: [
        MockComponent(EmployeeCardComponent),
        MockComponent(EmployeeLoadingComponent),
        MockComponent(LoadingPlaceholderComponent),
        HomePageComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
    employeeServiceSpy.getEmployees.and.returnValue(of([new Employee({name: 'employee test'})]));
    fixture.detectChanges();
  });

  it('should create component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialice employeees', async(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('app-employee-card')).length).toBe(1);
    });
  }));
});
