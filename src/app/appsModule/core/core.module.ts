import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  NotificationsService,
  SimpleNotificationsModule
} from 'angular2-notifications';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SpinnerService } from '../../services/spinner.service';
import { ChartComponent } from '../shared/charts/charts';
import { ProfileModal } from '../shared/profileModal/profile.modal';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { NotFoundComponent } from './../../not-found.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SidebarComponent } from './views/sidebar//sidebar.component';
import { HttpApiInterceptor } from '../../services/http-interceptor';
import { NotAuthComponent } from './../../not-auth.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    ProfileModal,
    ChartComponent,
    NotFoundComponent,
    NotAuthComponent
  ],
  imports: [
    CommonModule,
    NgSemanticModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    FlexLayoutModule,
    SpinnerModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    NotFoundComponent,
    NotAuthComponent,
    ProfileModal,
    HttpClientModule,
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
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
