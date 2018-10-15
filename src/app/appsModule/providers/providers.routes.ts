import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { ProvidersChartsCardsComponent } from './charts/providers.charts.cards.component';
import { ProvidersChartsComponent } from './charts/providers.charts.component';
import { ProvidersGridComponent } from './grid/providers.grid.component';
import { ProvidersMainComponent } from './providers.main.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    component: ProvidersMainComponent,
    children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full' },
      {
        path: 'grid',
        component: ProvidersGridComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'charts',
        component: ProvidersChartsCardsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'charts/:type',
        component: ProvidersChartsComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
