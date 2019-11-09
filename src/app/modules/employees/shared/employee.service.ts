import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {catchError, map, tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {LoggerService} from '../../../shared/services/logger.service';
import {AppConfig} from '../../../configs/app.config';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {EndpointsConfig} from '../../../configs/endpoints.config';
import {CookieService} from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeesCollection: AngularFirestoreCollection<Employee>;

  constructor(private afs: AngularFirestore,
              private snackBar: MatSnackBar,
              private i18n: I18n,
              private cookieService: CookieService) {
    this.employeeesCollection = this.afs.collection<Employee>(EndpointsConfig.employeees.list, (employee) => {
      return employee.orderBy('default', 'desc').orderBy('likes', 'desc');
    });
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result);
    };
  }

  checkIfUserCanVote(): boolean {
    const votes = this.cookieService.get('votes');
    return Number(votes ? votes : 0) < AppConfig.votesLimit;
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeeesCollection.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return new Employee({id: action.payload.doc.id, ...data});
          });
        }),
        tap(() => LoggerService.log(`fetched employeees`)),
        catchError(EmployeeService.handleError('getEmployees', []))
      );
  }

  getEmployee(id: string): Observable<any> {
    return this.afs.doc(EndpointsConfig.employeees.detail(id)).get().pipe(
      map((employee) => {
        return new Employee({id, ...employee.data()});
      }),
      tap(() => LoggerService.log(`fetched employee ${id}`)),
      catchError(EmployeeService.handleError('getEmployee', []))
    );
  }

  createEmployee(employee: Employee): Promise<DocumentReference> {
    return this.employeeesCollection.add(JSON.parse(JSON.stringify(employee)));
  }

  updateEmployee(employee: Employee): Promise<void> {
    return this.afs.doc(EndpointsConfig.employeees.detail(employee.id)).update(JSON.parse(JSON.stringify(employee))).then(() => {
      LoggerService.log(`updated employee w/ id=${employee.id}`);
      this.showSnackBar(this.i18n({value: 'Saved', id: '@@saved'}));
    });
  }

  deleteEmployee(id: string): Promise<void> {
    return this.afs.doc(EndpointsConfig.employeees.detail(id)).delete();
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
}
