import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { StockMainComponent } from './stock.main.component';
import { StockGridComponent } from './grid/stock.grid.component';
import { StockChartsCardsComponent } from './charts/stock.charts.cards.component';
import { StockChartsComponent } from './charts/stock.charts.component';

// Route Configuration
export const routes: Routes = [
  { path: '', component: StockMainComponent,
    children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full'},
      { path: 'grid', component: StockGridComponent,  canActivate: [AuthGuard]},
      { path: 'charts', component: StockChartsCardsComponent,  canActivate: [AuthGuard]},
      { path: 'charts/:type', component: StockChartsComponent,  canActivate: [AuthGuard]},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

