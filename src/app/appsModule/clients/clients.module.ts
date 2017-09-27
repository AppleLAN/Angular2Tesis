import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientsMainComponent } from './clients.main.component';
import { ClientsGridComponent } from './grid/clients.grid.component';
import { ClientModal } from './clientModal/client.modal';
import { ClientsChartsCardsComponent } from './charts/clients.charts.cards.component';
import { ClientsChartsComponent } from './charts/clients.charts.component';
import { CoreModule } from '../../appsModule/core/core.module';
import { routing } from './clients.routes';
import { UserService } from '../../services/user.service';
import { ClientsService } from './../../services/clients.service';
import { ChartService } from './../../services/chart.service';
import { AuthGuard } from '../../services/auth.guard';

@NgModule({
  declarations: [
    ClientsMainComponent,
    ClientsGridComponent,
    ClientModal,
    ClientsChartsCardsComponent,
    ClientsChartsComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    routing
  ],
  providers: [ AuthGuard, UserService, ClientsService, ChartService ],
  bootstrap: [ ClientsMainComponent]
})
export class ClientsModule { }
