import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { routing } from './app.routes';

import { UserAuthenticationService } from './services/user-authentication.service';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    NgSemanticModule,
    StoreModule.provideStore([]),
  ],
  providers: [AuthGuard,UserAuthenticationService],
  bootstrap: [ AppComponent]
})
export class AppModule { }
