import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/stock';
import { FormControl } from '@angular/forms';
import { includes } from 'lodash';

@Component({
  selector: 'table-pagination',
  template: `
   <div>
     <sm-input
       icon="shopping bag"
       type="text"
       [formControl]="searchProduct"
       placeholder="Ingrese nombre..."
       ngDefaultControl>
    </sm-input>
   </div>
    <table class="ui celled table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Precio a costo</th>
                <th>Categoria</th>
                <th>Codigo</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let item of filteredItems">
                <td>{{item.name}}</td>
                <td>{{item.description}}</td>
                <td>{{item.cost_price}}</td>
                <td>{{item.category_id}}</td>
                <td>{{item.code}}</td>
                <td>{{item.quantity}}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr *ngIf="numberOfPages.length > 0">
                <th colspan="7">
                    <div class="ui right floated pagination menu">
                        <button [disabled]="currentIndex === 0" [ngClass]="{'disabled': currentIndex === 0}" class="pagination-button" (click)="previousPage()"><i class="left chevron icon"></i></button>
                        <a class="item" *ngFor="let pageNumber of numberOfPages">{{pageNumber + 1}}</a>
                        <button [disabled]="currentIndex === pageSize || filteredItems.length < pageSize" [ngClass]="{'disabled': currentIndex === pageSize && filteredItems.length > 0}" class="pagination-button" (click)="nextPage()"><i class="right chevron icon"></i></button>
                    </div>
                </th>
            </tr>
        </tfoot>
    </table>
  `,
  styles: [`
  .pagination {
    margin: 0px !important;
    .pagination-button {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }`]
})
export class Pagination implements OnChanges, OnInit {
  @Input() productList: Product[];
  filteredItems: Product[];
  pageSize = 5;
  currentIndex = 0;
  inputName = '';
  numberOfPages: number[] = [];
  searchProduct = new FormControl();

  constructor() {}

  ngOnInit() {
    this.searchProduct.valueChanges.debounceTime(400).subscribe(value => {
      this.filteredItems = this.productList.filter(product => includes(`${product.name}`, value));
    });
  }

  ngOnChanges() {
    if (this.productList) {
      this.getNewItems();
      this.numberOfPages = Array(Math.round(this.productList.length / this.pageSize)).fill(0).map(i => i);
    }
  }

  getNewItems() {
    this.filteredItems = this.productList.slice(this.currentIndex, this.pageSize + this.currentIndex);
  }

  nextPage() {
    if (this.currentIndex < this.pageSize) {
      this.currentIndex = this.currentIndex + this.pageSize;
      this.getNewItems();
    }
  }

  previousPage() {
    if (this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - this.pageSize;
      this.getNewItems();
    }
  }
}
