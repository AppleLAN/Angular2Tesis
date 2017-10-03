import { Component, Input, NgModule, OnChanges, OnInit } from '@angular/core';
import { Stock } from '../../../interfaces/stock';
import { FormControl } from '@angular/forms';
import { include } from 'lodash';

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
                        <sm-button [disabled]="currentIndex === 0" [ngClass]="{'disabled': currentIndex === 0}" class="normal" (click)="previousPage()" icon="left chevron icon"></sm-button>
                        <a class="item" *ngFor="let pageNumber of numberOfPages">{{pageNumber + 1}}</a>
                        <sm-button [disabled]="currentIndex === pageSize" [ngClass]="{'disabled': currentIndex === pageSize}" class="normal" (click)="nextPage()" icon="right chevron icon"></sm-button>                        
                    </div>
                </th>
            </tr>
        </tfoot>
    </table>
  `,
 styles: ['.pagination { margin: 0px !important; }']
})
export class Pagination implements OnChanges, OnInit {
  @Input() productList;
  filteredItems : Stock[];
  pageSize : number = 5;
  currentIndex : number = 0;
  inputName : string = '';
  numberOfPages: number[] = [];
  searchProduct = new FormControl();

  constructor( ) {
  };

  ngOnInit() {
    this.searchProduct.valueChanges.debounceTime(400).subscribe( value => {
      this.filteredItems = this.productList.filter( product => include(`${product.name}`, value)); 
    });
  }

  ngOnChanges() {
    if (this.productList) {
      this.getNewItems();    
      this.numberOfPages = Array(Math.round( this.productList.length / this.pageSize)).fill(0).map((x,i)=>i);
    }
  }

  getNewItems() {
    this.filteredItems = this.productList.slice(this.currentIndex, this.pageSize);    
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