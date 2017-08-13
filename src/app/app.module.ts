import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './appsModule/core/core.module';
import { routing } from './app.routes';

import { UserAuthenticationService } from './services/user-authentication.service';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    routing,
  ],
  providers: [AuthGuard, UserAuthenticationService],
  bootstrap: [ AppComponent]
})
export class AppModule { }
