import { NotificationsService } from 'angular2-notifications';
import { OrdersState } from '../reducers/order.reducer';
import { Observable } from 'rxjs/Rx';
import { Order } from '../../../interfaces/order';
import { SaleService } from '../services/sale.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  $orders: Observable<OrdersState>;
  options: any;

  constructor(
    private ss: SaleService,
    private ns: NotificationsService,
    private spinnerService: SpinnerService
  ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.ss.getAllOrders().subscribe(r => {
      this.spinnerService.displayLoader(false);
    });
    this.$orders = this.ss.getOrderStorage();
  }

  completeOrder(order: Order) {
    this.spinnerService.displayLoader(true);
    this.ss.completeOrder(order).subscribe(
      () => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su orden ha sido completada');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error(
          'Error!',
          'Un error ha ocurrido por favor intentelo mas tarde'
        );
      }
    );
  }

  deleteOrder(order: Order) {
    this.spinnerService.displayLoader(true);
    this.ss.deleteOrder(order).subscribe(
      () => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su orden ha sido eliminadada');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error(
          'Error!',
          'Un error ha ocurrido por favor intentelo mas tarde'
        );
      }
    );
  }
}
