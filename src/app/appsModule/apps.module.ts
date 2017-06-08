import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { StoreModule } from '@ngrx/store';

import { AppsComponent } from './apps.component';
import { routing } from './apps.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileModal } from './shared/profileModal/profile.modal';

import { UserService } from './../services/user.service';
import { AuthGuard } from '../services/auth.guard';

import { reducer } from './apps.reducers';

@NgModule({
  declarations: [
    AppsComponent,
    HomeComponent,
    NavbarComponent,
    ProfileModal
  ],
  imports: [
    CommonModule,
    HttpModule,
    NgSemanticModule,
    routing,
    ReactiveFormsModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
  ],
  providers: [AuthGuard,UserService],
  bootstrap: [ AppsComponent]
})
export class AppsModule { }
