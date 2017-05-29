import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { ClientsMainComponent } from './clients.main.component';
import { ClientsGridComponent } from './grid/clients.grid.component';
import { ClientsChartsCardsComponent } from './charts/clients.charts.cards.component';
import { ClientsChartsComponent } from './charts/clients.charts.component';

// Route Configuration
export const routes: Routes = [
  { path: '', component: ClientsMainComponent,
    children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full'},
      { path: 'grid', component: ClientsGridComponent,  canActivate: [AuthGuard]},
      { path: 'charts', component: ClientsChartsCardsComponent,  canActivate: [AuthGuard]},
      { path: 'charts/:type', component: ClientsChartsComponent,  canActivate: [AuthGuard]},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

