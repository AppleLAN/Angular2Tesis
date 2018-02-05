import { Component } from '@angular/core';

@Component({
  selector: 'not-now',
  template: `<div class="sale-not-now">
              <img [src]="bugsImg" class="ui large image">
              <span>Not available yet</span>
            </div>`,
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent{
  constructor() { }
}