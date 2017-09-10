import { AppsComponent } from './apps.component';

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../services/auth.guard';

// Route Configuration
export const routes: Routes = [
  { path: '', component: AppsComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
      { path: 'clients', loadChildren: './../appsModule/clients/clients.module#ClientsModule', canActivate: [AuthGuard]},
      { path: 'providers', loadChildren: './../appsModule/providers/providers.module#ProvidersModule', canActivate: [AuthGuard]},
      { path: 'stock', loadChildren: './../appsModule/stock/stock.module#StockModule', canActivate: [AuthGuard]}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

