
// ====== ./app/app.routes.ts ======

// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../services/auth.guard';
import { ClientsComponent } from './clients/clients.component';

// Route Configuration
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
  { path: 'sales', component: HomeComponent,  canActivate: [AuthGuard]},
  { path: 'stock', component: HomeComponent,  canActivate: [AuthGuard]},
  { path: 'clients', component: ClientsComponent,  canActivate: [AuthGuard]},
  { path: 'providers', component: HomeComponent,  canActivate: [AuthGuard]},
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);