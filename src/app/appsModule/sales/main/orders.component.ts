import { NotificationsService } from 'angular2-notifications';
import { OrdersState } from '../reducers/order.reducer';
import { Observable } from 'rxjs/Rx';
import { Order } from '../../../interfaces/order';
import { SaleService } from '../services/sale.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  $orders: Observable<OrdersState>;
  options: any;

  constructor(private ss: SaleService, private ns: NotificationsService) { 
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    }
  }

  ngOnInit() {
    this.ss.getAllOrders().subscribe();
    this.$orders = this.ss.getOrderStorage();
  }

  completeOrder(order: Order) {
    this.ss.completeOrder(order).subscribe(
      () => this.ns.success('Perfecto!', 'Su orden ha sido completada'),
      error => this.ns.error('Error!', 'Un error ha ocurrido por favor intentelo mas tarde')
    );
  }

  deleteOrder(order: Order) {
    this.ss.deleteOrder(order).subscribe(
      () => this.ns.success('Perfecto!', 'Su orden ha sido eliminadada'),
      error => this.ns.error('Error!', 'Un error ha ocurrido por favor intentelo mas tarde')
    );
  }
}