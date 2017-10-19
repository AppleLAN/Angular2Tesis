import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StockMainComponent } from './stock.main.component';
import { StockGridComponent } from './grid/stock.grid.component';
import { StockModal } from './StockModal/stock.modal';
import { StockChartsCardsComponent } from './charts/stock.charts.cards.component';
import { StockChartsComponent } from './charts/stock.charts.component';
import { CoreModule } from '../../appsModule/core/core.module';
import { routing } from './stock.routes';
import { UserService } from '../../services/user.service';
import { ProvidersService } from '../../services/providers.service';
import { StockService } from './../../services/stock.service';
import { ChartService } from './../../services/chart.service';
import { AuthGuard } from '../../services/auth.guard';

@NgModule({
  declarations: [
    StockMainComponent,
    StockGridComponent,
    StockModal,
    StockChartsCardsComponent,
    StockChartsComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    routing
  ],
  providers: [ AuthGuard, UserService, StockService, ChartService, ProvidersService ],
  bootstrap: [ StockMainComponent]
})
export class StockModule { }
