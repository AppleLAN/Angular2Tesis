import { ApiClient } from './service/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './views/sidebar//sidebar.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { ProfileModal } from '../shared/profileModal/profile.modal';
import { ChartComponent } from '../shared/charts/charts';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

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
        SimpleNotificationsModule
    ],
    providers: [
        ApiClient,
        NotificationsService
    ]
})
export class CoreModule { }
