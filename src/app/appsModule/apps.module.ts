import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from '../services/auth.guard';
import { HttpApiInterceptor } from '../services/http-interceptor';
import { SharedService } from '../services/shared.service';
import { UserService } from './../services/user.service';
import { AppsComponent } from './apps.component';
import { reducer } from './apps.reducers';
import { routing } from './apps.routes';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppsComponent, HomeComponent],
  imports: [
    CommonModule,
    routing,
    CoreModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [
    AuthGuard,
    UserService,
    SharedService
  ],
  bootstrap: [AppsComponent]
})
export class AppsModule {}
