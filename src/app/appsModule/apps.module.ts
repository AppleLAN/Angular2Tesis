import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppsComponent } from './apps.component';
import { routing } from './apps.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';

import { HomeComponent } from './home/home.component';
import { UserService } from './../services/user.service';
import { AuthGuard } from '../services/auth.guard';
import { reducer } from './apps.reducers';
import { SharedService } from '../services/shared.service';

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
  providers: [AuthGuard, UserService, SharedService],
  bootstrap: [AppsComponent]
})
export class AppsModule {}
