import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { StoreModule } from '@ngrx/store';

import { routing } from './auth.routing';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserAuthenticationService } from '../services/user-authentication.service';
import { AuthGuard } from '../services/auth.guard';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    NgSemanticModule,
    StoreModule.provideStore([])
  ],
  providers: [AuthGuard, UserAuthenticationService],
  bootstrap: [ AuthComponent]
})
export class AuthModule { }
