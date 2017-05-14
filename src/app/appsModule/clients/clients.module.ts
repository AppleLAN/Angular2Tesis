import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { StoreModule } from '@ngrx/store';

import { ClientsMainComponent } from './clients.main.component';
import { ClientsGridComponent } from './clients.grid.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { routing } from './clients.routes';

import { UserService } from '../../services/user.service';
import { AuthGuard } from '../../services/auth.guard';

@NgModule({
  declarations: [
    ClientsMainComponent,
    ClientsGridComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    NgSemanticModule,
    routing,
    StoreModule.provideStore([])
  ],
  providers: [AuthGuard,UserService],
  bootstrap:    [ ClientsMainComponent]
})
export class ClientsModule { }
