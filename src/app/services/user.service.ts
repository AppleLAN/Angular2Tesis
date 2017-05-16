import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  token: string;
  headers: Headers;
  options: RequestOptions
;
  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    this.options = new RequestOptions({ headers: this.headers });
   }

  getUserApps(): Observable<Object[]> {
    return this.http.get('http://localhost:8000/api/getUserApps', this.options)
      .map((response: Response) => {
        return response.json().apps;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
