import {TestBed} from '@angular/core/testing';
import {EmployeeService} from './employee.service';
import {Employee} from './employee.model';
import {HttpErrorResponse} from '@angular/common/http';
import {configureTestSuite} from 'ng-bullet';
import {FirebaseModule} from '../../../shared/modules/firebase.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {CookieService} from 'ngx-cookie';
import {AngularFirestore} from '@angular/fire/firestore';
import {of, throwError} from 'rxjs';

describe('EmployeeService', () => {
  const employeeId = 'BzTvl77YsRTtdihH0jeh';
  let employeeService: EmployeeService;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss', 'showSnackBar']);
  const afsSpy = jasmine.createSpyObj('AngularFirestore', ['doc', 'collection', 'delete']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FirebaseModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: afsSpy},
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {
          provide: CookieService, useValue: {
            get: () => 0
          }
        },
        {
          provide: I18n, useValue: () => {
          }
        },
        EmployeeService
      ]
    });
  });

  beforeEach(() => {
    afsSpy.doc.and.returnValue({
      update: () => new Promise((resolve) => resolve()),
      get: () => of({
        data: () => new Employee({
          id: employeeId,
          name: 'test',
          alterEgo: 'test'
        })
      }),
      delete: () => new Promise((resolve) => resolve())
    });

    afsSpy.collection.and.returnValue({
      add: () => new Promise((resolve) => resolve()),
      snapshotChanges: () => of([
        {
          payload: {
            doc: {
              id: 'asd',
              data: () => {
                return {
                  id: 'noid',
                  name: 'test'
                };
              }
            }
          }
        }
      ])
    });

    employeeService = TestBed.get(EmployeeService);
  });

  it('should get employee by id ' + employeeId, (() => {
    employeeService.getEmployee(employeeId).subscribe((employee: Employee) => {
      expect(employee.id).toEqual(employeeId);
    });
  }));

  it('should get employeees', (() => {
    employeeService.getEmployees().subscribe((employeees: Employee[]) => {
      expect(employeees.length).toBe(1);
    });
  }));

  it('should fail getting employee by no id', (() => {
    employeeService.getEmployee('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should create a employee', (() => {
    employeeService.createEmployee(new Employee({
      name: 'test',
      alterEgo: 'test'
    })).then(() => {
      expect(afsSpy.collection).toHaveBeenCalled();
    });
  }));

  it('should update employee', (() => {
    employeeService.updateEmployee(new Employee({
      name: 'test',
      alterEgo: 'test'
    })).then(() => {
      expect(afsSpy.doc).toHaveBeenCalled();
    });
  }));

  it('should delete employee', (() => {
    employeeService.deleteEmployee('oneId').then(() => {
      expect(afsSpy.doc).toHaveBeenCalled();
    });
  }));

  it('should check if user can vote', (() => {
    expect(employeeService.checkIfUserCanVote()).toBe(true);
  }));

  it('should fail getting one employee', (() => {
    afsSpy.doc.and.returnValue({
      get: () => throwError({message: 'this is an error', status: 404})
    });

    employeeService.getEmployee('asd').subscribe(() => {
    }, (error) => {
      expect(error.status).toBe(404);
    });

    afsSpy.doc.and.returnValue({
      get: () => throwError({message: 'this is an error', status: 500})
    });

    employeeService.getEmployee('internal error').subscribe(() => {
    }, (error) => {
      expect(error.status).toBe(500);
    });
  }));
});
