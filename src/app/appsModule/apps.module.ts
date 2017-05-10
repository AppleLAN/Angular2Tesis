import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { StoreModule } from '@ngrx/store';

import { AppsComponent } from './apps.component';
import { routing } from './apps.routes';
import { ClientsComponent } from './clients/clients.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { UserService } from './../services/user.service';
import { AuthGuard } from '../services/auth.guard';

@NgModule({
  declarations: [
    AppsComponent,
    HomeComponent,
    NavbarComponent,
    ClientsComponent,
  ],
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    NgSemanticModule,
    routing,
    StoreModule.provideStore([])
  ],
  providers: [AuthGuard,UserService],
  bootstrap:    [ AppsComponent]
})
export class AppsModule { }
