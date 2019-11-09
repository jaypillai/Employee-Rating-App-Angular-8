import {InjectionToken} from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const basePaths = {
  employeees: 'employeees',
};

const routesNames = {
  home: '',
  error404: '404',
  employeees: {
    basePath: basePaths.employeees
  }
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    error404: `/${routesNames.error404}`,
    employeees: {
      detail: getEmployeeDetail
    }
  }
};

export function getEmployeeDetail(id) {
  return `/${basePaths.employeees}/${id}`;
}
