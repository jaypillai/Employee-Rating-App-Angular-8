import {browser, by, element} from 'protractor';
import {RoutesConfig} from '../../../../../src/app/configs/routes.config';

export class EmployeesListPage {
  static navigateTo(): any {
    return browser.get(RoutesConfig.routesNames.employeees.basePath);
  }

  static getNumberEmployees(): any {
    return element.all(by.css('#left mat-list-item')).count();
  }
}
