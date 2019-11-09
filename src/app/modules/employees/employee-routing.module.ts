import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesListPageComponent} from './pages/employee-list-page/employee-list-page.component';
import {EmployeeDetailPageComponent} from './pages/employee-detail-page/employee-detail-page.component';
import { EmployeeResolver } from './shared/employee.resolver';


const employeeesRoutes: Routes = [
  {path: '', component: EmployeesListPageComponent},
  {
    path: ':id',
    component: EmployeeDetailPageComponent,
    resolve: {employee: EmployeeResolver}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(employeeesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    EmployeeResolver
  ]
})

export class EmployeeRoutingModule {
}
