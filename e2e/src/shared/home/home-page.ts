import {browser, by, element} from 'protractor';

export class HomePage {
  static navigateTo(): any {
    return browser.get('/');
  }

  static getNumberEmployees(): any {
    return element.all(by.css('#employeees-list mat-card')).count();
  }
}
