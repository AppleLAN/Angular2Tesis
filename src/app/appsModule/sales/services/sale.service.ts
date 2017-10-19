import { ApiClient } from '../../core/service/api';
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

  constructor(private http: Http, private api: ApiClient) {
    }
    

    buy(addedProducts: NewBuy): Observable<any> {
        return this.api.post('http://localhost:8000/api/saveBuyOrder', addedProducts)
            .map((response: Response) => {
                const thisResponse = response;
                return thisResponse;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

}
