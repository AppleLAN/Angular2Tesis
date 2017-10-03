import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { NewBuy } from '../../../interfaces/stock';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SaleService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        this.options = new RequestOptions({ headers: this.headers });
    }
    

    buy(addedProducts: NewBuy): Observable<any> {
        return this.http.post('http://localhost:8000/api/saveBuyOrder', addedProducts, this.options)
            .map((response: Response) => {
                const thisResponse = response.json();
                return thisResponse;
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

}
