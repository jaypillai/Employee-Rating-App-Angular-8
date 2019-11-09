import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployeeRoutingModule} from './employee-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {EmployeeRemoveComponent} from './components/employee-remove/employee-remove.component';
import {EmployeesListPageComponent} from './pages/employee-list-page/employee-list-page.component';
import {EmployeeDetailPageComponent} from './pages/employee-detail-page/employee-detail-page.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EmployeeRoutingModule
  ],
  declarations: [
    EmployeesListPageComponent,
    EmployeeDetailPageComponent,
    EmployeeRemoveComponent
  ],
  entryComponents: [
    EmployeeRemoveComponent
  ]
})

export class EmployeesModule {
}
