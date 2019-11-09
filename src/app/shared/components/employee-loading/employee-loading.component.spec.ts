import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EmployeeLoadingComponent} from './employee-loading.component';
import {configureTestSuite} from 'ng-bullet';
import {LoadingPlaceholderComponent} from '../loading-placeholder/loading-placeholder.component';
import {MockComponent} from 'ng-mocks';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

describe('EmployeeLoadingComponent', () => {
  let component: EmployeeLoadingComponent;
  let fixture: ComponentFixture<EmployeeLoadingComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        MockComponent(LoadingPlaceholderComponent),
        EmployeeLoadingComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
