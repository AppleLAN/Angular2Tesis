import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { ClientsMainComponent } from './clients.main.component';
import { ClientsGridComponent } from './clients.grid.component';

// Route Configuration
export const routes: Routes = [
  { path: '', component: ClientsMainComponent,
    children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full'},
      { path: 'grid', component: ClientsGridComponent,  canActivate: [AuthGuard]},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

