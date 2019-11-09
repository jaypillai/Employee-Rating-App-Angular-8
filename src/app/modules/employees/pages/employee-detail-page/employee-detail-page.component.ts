import {Component, OnInit} from '@angular/core';
import {Employee} from '../../shared/employee.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';
import {RoutesConfig} from '../../../../configs/routes.config';

@Component({
  selector: 'app-employee-detail-page',
  templateUrl: './employee-detail-page.component.html',
  styleUrls: ['./employee-detail-page.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: {timing: 1, delay: 0}
    }))])
  ]
})

export class EmployeeDetailPageComponent implements OnInit {

  employee: Employee;

  constructor(private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.employee = this.activatedRoute.snapshot.data.employee;
  }

  goBack(): void {
    this.location.back();
  }

  goToTheAnchor(): void {
    this.router.navigate([RoutesConfig.routes.employeees.detail(this.employee.id)], {fragment: 'employeee-detail'});
  }
}
