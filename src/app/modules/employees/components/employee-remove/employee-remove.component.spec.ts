import {EmployeeRemoveComponent} from './employee-remove.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {configureTestSuite} from 'ng-bullet';
import {MatDialogModule} from '@angular/material/dialog';

describe('EmployeeRemoveComponent', () => {
  let component: EmployeeRemoveComponent;
  let fixture: ComponentFixture<EmployeeRemoveComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [
        EmployeeRemoveComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRemoveComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', (() => {
    expect(component).toBeTruthy();
  }));
});
