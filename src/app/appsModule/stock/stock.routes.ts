import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { StockChartsCardsComponent } from './charts/stock.charts.cards.component';
import { StockChartsComponent } from './charts/stock.charts.component';
import { StockContainerComponent } from './grid/stock-container.component';
import { StockMainComponent } from './stock.main.component';

// Route Configuration
export const routes: Routes = [
  { path: '', component: StockMainComponent,
    children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full'},
      { path: 'grid', component: StockContainerComponent,  canActivate: [AuthGuard]},
      { path: 'charts', component: StockChartsCardsComponent,  canActivate: [AuthGuard]},
      { path: 'charts/:type', component: StockChartsComponent,  canActivate: [AuthGuard]},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

