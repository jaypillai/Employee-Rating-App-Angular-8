import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {EmployeeDetailPageComponent} from './employee-detail-page.component';
import {configureTestSuite} from 'ng-bullet';
import {EmployeeLoadingComponent} from '../../../../shared/components/employee-loading/employee-loading.component';
import {MockComponent} from 'ng-mocks';
import {EmployeeService} from '../../shared/employee.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Employee} from '../../shared/employee.model';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Location} from '@angular/common';
import { EmployeeCardComponent } from 'src/app/shared/components/employee-card/employee-card.component';

describe('EmployeeDetailPage', () => {
  let component: EmployeeDetailPageComponent;
  let fixture: ComponentFixture<EmployeeDetailPageComponent>;

  const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployee']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        MockComponent(EmployeeLoadingComponent),
        MockComponent(EmployeeCardComponent),
        EmployeeDetailPageComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                employee: new Employee({id: '1'})
              }
            }
          }
        },
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {
          provide: Location, useValue: {
            back: () => {
            }
          }
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailPageComponent);
    component = fixture.debugElement.componentInstance;
    employeeServiceSpy.getEmployee.and.returnValue(of(new Employee({id: '1', name: 'test', default: true})));
    fixture.detectChanges();
  });

  it('should create employee detail component', (() => {
    expect(component).toBeTruthy();
    expect(component.employee.id).toBe('1');
  }));
});
