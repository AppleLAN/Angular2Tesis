import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SpinnerService } from '../../services/spinner.service';
import { ChartComponent } from '../shared/charts/charts';
import { ProfileModal } from '../shared/profileModal/profile.modal';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { httpFactory } from './service/api';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SidebarComponent } from './views/sidebar//sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    ProfileModal,
    ChartComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    NgSemanticModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    FlexLayoutModule,
    SpinnerModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    ProfileModal,
    HttpModule,
    NgSemanticModule,
    ReactiveFormsModule,
    RouterModule,
    ChartComponent,
    ChartsModule,
    FlexLayoutModule,
    SpinnerModule,
    SimpleNotificationsModule
  ],
  providers: [
    NotificationsService,
    SpinnerService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class CoreModule {}
