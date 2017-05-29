import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ClientsMainComponent } from './clients.main.component';
import { ClientsGridComponent } from './grid/clients.grid.component';
import { ClientsChartsCardsComponent } from './charts/clients.charts.cards.component';
import { ClientsChartsComponent } from './charts/clients.charts.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChartComponent } from '../shared/charts/charts';

import { routing } from './clients.routes';

import { gridReducer } from './reducers/grid.reducer';
import { chartReducer } from './reducers/chart.reducer';

import { UserService } from '../../services/user.service';
import { ClientsService } from './../../services/clients.service';
import { AuthGuard } from '../../services/auth.guard';

@NgModule({
  declarations: [
    ClientsMainComponent,
    ClientsGridComponent,
    ClientsChartsCardsComponent,
    ClientsChartsComponent,
    SidebarComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    NgSemanticModule,
    routing,
    ReactiveFormsModule,
    StoreModule.provideStore({client : gridReducer, chart : chartReducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    ChartsModule
  ],
  providers: [AuthGuard,UserService,ClientsService],
  bootstrap:    [ ClientsMainComponent]
})
export class ClientsModule { }
