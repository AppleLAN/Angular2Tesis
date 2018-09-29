import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../appsModule/core/core.module';
import { FacturaComponent } from '../../appsModule/sales/factura/factura.component';
import { AuthGuard } from '../../services/auth.guard';
import { ClientsService } from '../../services/clients.service';
import { ProvidersService } from '../../services/providers.service';
import { StockService } from '../../services/stock.service';
import { MapToIterable } from '../shared/pipes/map-to-iterable.pipe';
import { BuyComponent } from './main/buy.component';
import { CreatedSalesComponent } from './main/created-sales.component';
import { OrdersComponent } from './main/orders.component';
import { SaleComponent } from './main/sale.component';
import { Pagination } from './pagination-table/pagination-table';
import { SalesMainComponent } from './sales-main.component';
import { routing } from './sales.routes';
import { SaleService } from './services/sale.service';

@NgModule({
  declarations: [
    SalesMainComponent,
    SaleComponent,
    BuyComponent,
    CreatedSalesComponent,
    OrdersComponent,
    Pagination,
    MapToIterable,
    FacturaComponent
  ],
  imports: [CoreModule, CommonModule, routing, FormsModule],
  providers: [
    AuthGuard,
    StockService,
    ProvidersService,
    ClientsService,
    SaleService,
    MapToIterable
  ],
  bootstrap: [SalesMainComponent]
})
export class SalesModule {}
