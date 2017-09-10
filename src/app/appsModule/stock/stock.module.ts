import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StockMainComponent } from './stock.main.component';
import { StockGridComponent } from './grid/stock.grid.component';
import { StockModal } from './StockModal/stock.modal';
import { StockChartsCardsComponent } from './charts/stock.charts.cards.component';
import { StockChartsComponent } from './charts/stock.charts.component';
import { CoreModule } from '../../appsModule/core/core.module';
import { routing } from './stock.routes';
import { reducer } from './stock.reducers';

import { UserService } from '../../services/user.service';
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
    routing,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
  ],
  providers: [ AuthGuard, UserService, StockService, ChartService ],
  bootstrap: [ StockMainComponent]
})
export class StockModule { }
