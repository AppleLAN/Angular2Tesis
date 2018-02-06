import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProvidersMainComponent } from './providers.main.component';
import { ProvidersGridComponent } from './grid/providers.grid.component';
import { ProviderModal } from './providersModal/providers.modal';
import { ProvidersChartsCardsComponent } from './charts/providers.charts.cards.component';
import { ProvidersChartsComponent } from './charts/providers.charts.component';
import { CoreModule } from '../../appsModule/core/core.module';
import { routing } from './providers.routes';
import { UserService } from '../../services/user.service';
import { ProvidersService } from './../../services/providers.service';
import { ChartService } from './../../services/chart.service';
import { AuthGuard } from '../../services/auth.guard';

@NgModule({
  declarations: [
    ProvidersMainComponent,
    ProvidersGridComponent,
    ProviderModal,
    ProvidersChartsCardsComponent,
    ProvidersChartsComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    routing
  ],
  providers: [ AuthGuard, UserService, ProvidersService, ChartService ],
  bootstrap: [ ProvidersMainComponent]
})
export class ProvidersModule { }
