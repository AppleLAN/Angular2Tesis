import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SalesMainComponent } from './sales.main.component';
import { CoreModule } from '../../appsModule/core/core.module';
import { routing } from './sales.routes';
import { AuthGuard } from '../../services/auth.guard';
import { SaleComponent } from './main/sale.component';
import { BuyComponent } from './main/buy.component';

@NgModule({
  declarations: [
    SalesMainComponent,
    SaleComponent,
    BuyComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    routing
  ],
  providers: [ AuthGuard],
  bootstrap: [ SalesMainComponent]
})
export class SalesModule { }
