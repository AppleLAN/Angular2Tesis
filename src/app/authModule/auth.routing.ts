// ====== ./app/app.routes.ts ======

// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterCompanyComponent } from './registerCompany/register-company.component';
import { HasCompanyGuard } from './../services/company.guard';
import { HasUserGuard } from './../services/hasUser.guard';

// Route Configuration
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'apps', loadChildren: './../appsModule/apps.module#AppsModule', canActivate: [HasCompanyGuard]},
  { path: 'register-company', component: RegisterCompanyComponent, canActivate: [HasUserGuard]}
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
