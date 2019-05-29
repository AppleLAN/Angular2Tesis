import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Order } from '../../../interfaces/order';
import { SpinnerService } from '../../../services/spinner.service';
import { SaleService } from '../services/sale.service';
import { OrdersState } from '../reducers/order.reducer';
import * as moment from 'moment';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  options: any;
  filter: string = null;
  ordersStorage: OrdersState[];
  filteredOrders: OrdersState[];

  constructor(private ss: SaleService, private ns: NotificationsService, private spinnerService: SpinnerService) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.ss.getAllOrders().subscribe(orders => {
      if (orders) {
        const formattedOrder = orders.data.map((order: any) => {
          order.order.createdAt = order.details[0].created_at;
          order.order.createdAt = moment(order.order.createdAt).format('YYYY-MM-DD');
          return order;
        });
        this.ordersStorage = formattedOrder;
        this.filteredOrders = formattedOrder;
      }
      this.spinnerService.displayLoader(false);
    });
  }

  onChange(event: string) {
    if (event.length > 0) {
      this.filteredOrders = this.ordersStorage.filter(
        o =>
          o.order.provider.toUpperCase().includes(event.toUpperCase()) ||
          o.order.status.toUpperCase().includes(event.toUpperCase()) ||
          o.order.id.toString().includes(event.toUpperCase()) ||
          (o.order.status === 'R' && 'Recibido'.toUpperCase().includes(event.toUpperCase())) ||
          (o.order.status !== 'R' && 'A Completar'.toUpperCase().includes(event.toUpperCase())) ||
          (o.order.typeOfBuy === 'E' && 'Efectivo'.toUpperCase().includes(event.toUpperCase())) ||
          (o.order.typeOfBuy !== 'E' && 'Cuenta Corriente'.toUpperCase().includes(event.toUpperCase()))
      );
    } else {
      this.filteredOrders = this.ordersStorage;
    }
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
        this.ns.error('Error!', 'Un error ha ocurrido por favor intentelo mas tarde');
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
        this.ns.error('Error!', 'Un error ha ocurrido por favor intentelo mas tarde');
      }
    );
  }
}
