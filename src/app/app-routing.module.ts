import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {RoutesConfig} from './configs/routes.config';
import { AuthGuard } from './modules/core/_guards';
import { AdminComponent } from './pages/admin';
import { Role } from './modules/core/_models';
import { LoginComponent } from './pages/login';

const routesNames = RoutesConfig.routesNames;

const appRoutes: Routes = [
  {
      path: '',
      component: HomePageComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'admin',
      component: AdminComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.Admin] }
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {path: routesNames.employeees.basePath, loadChildren: () => import('./modules/employees/employee.module').then(m => m.EmployeesModule)},
  {path: routesNames.error404, component: Error404PageComponent},
  {path: '**', redirectTo: RoutesConfig.routes.error404}
];

export const routing = RouterModule.forRoot(appRoutes);
