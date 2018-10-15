import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesMainComponent } from './sales-main.component';

// Route Configuration
export const routes: Routes = [
  { path: '', component: SalesMainComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
