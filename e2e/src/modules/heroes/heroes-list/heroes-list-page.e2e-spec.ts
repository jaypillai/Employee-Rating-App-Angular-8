import {EmployeesListPage} from './employeees-list-page';
import {browser} from 'protractor';

describe('Employees list page', () => {
  let page;

  beforeEach(() => {
    page = new EmployeesListPage();
  });

  it('should contains equal or more employeees than default ones', () => {
    EmployeesListPage.navigateTo();
    browser.driver.sleep(2000);
    expect<any>(EmployeesListPage.getNumberEmployees()).toBeGreaterThanOrEqual(8);
  });
});
