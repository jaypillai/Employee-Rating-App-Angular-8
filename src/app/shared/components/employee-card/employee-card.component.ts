import {ChangeDetectionStrategy, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {EmployeeService} from '../../../modules/employees/shared/employee.service';
import {Employee} from '../../../modules/employees/shared/employee.model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';
import {ROUTES_CONFIG} from '../../../configs/routes.config';
import {CookieService} from 'ngx-cookie';
import {isPlatformBrowser} from '@angular/common';
import { StarRatingColor } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: {timing: 1, delay: 0}
    }))])
  ]
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee: Employee;

  rating = 3;
  starCount = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  canVote: boolean;
  isBrowser: boolean;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private snackBar: MatSnackBar,
              private i18n: I18n,
              private cookieService: CookieService,
              @Inject(PLATFORM_ID) private platformId: object,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.canVote = this.employeeService.checkIfUserCanVote();
  }

  onRatingChanged(employee, rating) {
    console.log(rating);
    this.rating = rating;
    if (this.canVote) {
      employee.updateRating(rating);
      this.cookieService.put('votes', '' + (Number(this.cookieService.get('votes') || 0) + 1));
      return this.employeeService.updateEmployee(employee);
    } else {
      this.snackBar.open(this.i18n({value: 'Can\'t vote anymore', id: '@@cannotVote'}), '', {duration: 1000});
    }
  }

  like(employee: Employee): Promise<void> {
    if (this.canVote) {
      employee.like();
      this.cookieService.put('votes', '' + (Number(this.cookieService.get('votes') || 0) + 1));
      return this.employeeService.updateEmployee(employee);
    } else {
      this.snackBar.open(this.i18n({value: 'Can\'t vote anymore', id: '@@cannotVote'}), '', {duration: 1000});
    }
  }

}
