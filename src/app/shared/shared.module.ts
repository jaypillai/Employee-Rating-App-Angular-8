import {NgModule} from '@angular/core';
import {MaterialModule} from './modules/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {FooterComponent} from './components/footer/footer.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {NgxScrollToFirstInvalidModule} from '@ismaestro/ngx-scroll-to-first-invalid';
import {LoadingPlaceholderComponent} from './components/loading-placeholder/loading-placeholder.component';
import {CapitalizeFirstPipe} from './pipes/capitalize-first.pipe';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeLoadingComponent } from './components/employee-loading/employee-loading.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    NgxExampleLibraryModule,
    NgxScrollToFirstInvalidModule,
    LazyLoadImageModule
  ],
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    EmployeeCardComponent,
    EmployeeLoadingComponent,
    LoadingPlaceholderComponent,
    CapitalizeFirstPipe,
    StarRatingComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgxExampleLibraryModule,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    EmployeeCardComponent,
    EmployeeLoadingComponent,
    NgxScrollToFirstInvalidModule,
    LoadingPlaceholderComponent,
    CapitalizeFirstPipe,
    LazyLoadImageModule,
    StarRatingComponent
  ]
})

export class SharedModule {
}
