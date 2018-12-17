import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SharedService } from '../../services/shared.service';
import { HttpApiInterceptor } from '../../services/http-interceptor';
import { SpinnerService } from '../../services/spinner.service';
import { ChartComponent } from '../shared/charts/charts';
import { ProfileModal } from '../shared/profileModal/profile.modal';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { NotAuthComponent } from './../../not-auth.component';
import { NotFoundComponent } from './../../not-found.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SidebarComponent } from './views/sidebar//sidebar.component';

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
    FormsModule,
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
    FormsModule,
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
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
