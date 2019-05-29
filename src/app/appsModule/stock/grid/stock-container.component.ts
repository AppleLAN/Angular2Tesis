import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-container',
  templateUrl: './stock-container.component.html',
  styleUrls: ['./stock-container.component.scss']
})
export class StockContainerComponent implements OnInit {
  operation = 'stock';

  constructor() { }

  ngOnInit() {
  }

}
