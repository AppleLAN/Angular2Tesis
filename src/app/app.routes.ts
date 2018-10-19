// ====== ./app/app.routes.ts ======

// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { NotAuthComponent } from './not-auth.component';

// Route Configuration
export const routes: Routes = [
  { path: '', loadChildren: './authModule/auth.module#AuthModule' },
  { path: '**', redirectTo: '/notfound' },
  { path: 'notfound', component: NotFoundComponent }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
