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
        ChartsModule
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
        ChartsModule
    ]
})
export class CoreModule { }
