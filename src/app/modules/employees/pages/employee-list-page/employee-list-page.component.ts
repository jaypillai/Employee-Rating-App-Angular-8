import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../../shared/employee.model';
import {EmployeeService} from '../../shared/employee.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UtilsHelperService} from '../../../../shared/services/utils-helper.service';
import {EmployeeRemoveComponent} from '../../components/employee-remove/employee-remove.component';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';
import {ROUTES_CONFIG} from '../../../../configs/routes.config';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-employeees-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: {timing: 1, delay: 0}
    }))])
  ]
})

export class EmployeesListPageComponent implements OnInit {

  employeees: Employee[];
  newEmployeeForm: FormGroup;
  canVote = false;
  error: boolean;

  @ViewChild('form', {static: false}) myNgForm; // just to call resetForm method

  constructor(private employeeService: EmployeeService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router,
              private i18n: I18n,
              private formBuilder: FormBuilder,
              private cookieService: CookieService,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.canVote = this.employeeService.checkIfUserCanVote();

    this.newEmployeeForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      alterEgo: new FormControl('', [Validators.required, Validators.maxLength(30)])
    });

    this.onChanges();
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((employeees: Array<Employee>) => {
      this.employeees = employeees;
    });
  }

  async createNewEmployee() {
    if (this.newEmployeeForm.valid) {
      this.employeeService.createEmployee(new Employee(this.newEmployeeForm.value)).then(() => {
        this.myNgForm.resetForm();
        this.snackBar.open(this.i18n({value: 'Employee created', id: '@@employeeCreated'}), '', {duration: 1000});
      }, () => {
        this.error = true;
      });
    }
  }

  like(employee: Employee) {
    this.canVote = this.employeeService.checkIfUserCanVote();
    if (this.canVote) {
      employee.like();
      this.cookieService.put('votes', '' + (Number(this.cookieService.get('votes') || 0) + 1));
      this.employeeService.updateEmployee(employee);
    } else {
      this.snackBar.open(this.i18n({value: 'Can\'t vote anymore', id: '@@cannotVote'}), '', {duration: 1000});
    }
  }

  deleteEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeRemoveComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(employee.id).then(() => {
          this.employeeService.showSnackBar(this.i18n({value: 'Employee removed', id: '@@employeeRemoved'}));
        }, () => {
          this.error = true;
        });
      }
    });
  }

  trackByFn(index: any) {
    return index;
  }

  private onChanges() {
    this.newEmployeeForm.get('name').valueChanges.subscribe((value) => {
      if (value && value.length >= 3 && UtilsHelperService.isPalindrome(value)) {
        this.snackBar.open(this.i18n({value: 'Yeah that\'s a Palindrome!', id: '@@yeahPalindrome'}), '', {duration: 2000});
      } else {
        this.snackBar.dismiss();
      }
    });
  }
}
