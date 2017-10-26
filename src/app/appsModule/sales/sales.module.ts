import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapToIterable } from '../shared/pipes/map-to-iterable.pipe';
import { SalesMainComponent } from './sales-main.component';
import { CoreModule } from '../../appsModule/core/core.module';
import { routing } from './sales.routes';
import { AuthGuard } from '../../services/auth.guard';
import { SaleComponent } from './main/sale.component';
import { BuyComponent } from './main/buy.component';
import { StockService } from '../../services/stock.service';
import { ProvidersService } from '../../services/providers.service';
import { Pagination } from './pagination-table/pagination-table';
import { SaleService } from './services/sale.service';


@NgModule({
  declarations: [
    SalesMainComponent,
    SaleComponent,
    BuyComponent,
    Pagination,
    MapToIterable
  ],
  imports: [
    CoreModule,
    CommonModule,
    routing,
    FormsModule
  ],
  providers: [ AuthGuard, StockService, ProvidersService, SaleService, MapToIterable],
  bootstrap: [ SalesMainComponent]
})
export class SalesModule { }
