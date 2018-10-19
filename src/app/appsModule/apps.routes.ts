import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthComponent } from '.././not-auth.component';
import { AuthGuard } from '../services/auth.guard';
import { AppsComponent } from './apps.component';
import { HomeComponent } from './home/home.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    component: AppsComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'noauth', component: NotAuthComponent },
      {
        path: 'clients',
        loadChildren: './../appsModule/clients/clients.module#ClientsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'providers',
        loadChildren:
          './../appsModule/providers/providers.module#ProvidersModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'stock',
        loadChildren: './../appsModule/stock/stock.module#StockModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'sales',
        loadChildren: './../appsModule/sales/sales.module#SalesModule',
        canActivate: [AuthGuard]
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
