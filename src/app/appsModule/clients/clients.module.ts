import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ReactiveFormsModule } from '@angular/forms';

import { ClientsMainComponent } from './clients.main.component';
import { ClientsGridComponent } from './clients.grid.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { routing } from './clients.routes';

import { gridReducer } from './reducers/grid.reducer';

import { UserService } from '../../services/user.service';
import { ClientsService } from './../../services/clients.service';
import { AuthGuard } from '../../services/auth.guard';

@NgModule({
  declarations: [
    ClientsMainComponent,
    ClientsGridComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    HttpModule,
    NgSemanticModule,
    routing,
    ReactiveFormsModule,
    StoreModule.provideStore({client : gridReducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [AuthGuard,UserService,ClientsService],
  bootstrap:    [ ClientsMainComponent]
})
export class ClientsModule { }
