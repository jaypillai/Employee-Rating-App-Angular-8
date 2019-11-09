import {InjectionToken} from '@angular/core';

export let ENDPOINTS_CONFIG = new InjectionToken('endpoints.config');

export const EndpointsConfig: any = {
  employeees: {
    list: 'users',
    detail: getEmployeeDetail
  }
};

export function getEmployeeDetail(id) {
  return `/users/${id}`;
}
