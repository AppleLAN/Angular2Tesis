import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user';
import { Client } from '../interfaces/client';
import { CompleteUser } from '../interfaces/complete.user';

import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { NEWUSER, NEWCOMPANY, userReducer, NEWUSERPROFILE } from './../appsModule/shared/reducers/user.reducer';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  token: string;
  headers: Headers;
  options: RequestOptions
  userStorage: Observable<CompleteUser>;
;
  constructor(private http: Http,  private store: Store<User>) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    this.options = new RequestOptions({ headers: this.headers });
    this.userStorage = store.select('user');
   }

  getUserStorage(): Observable<CompleteUser> {
      return this.userStorage;
  }

  getUserApps(): Observable<any> {
    return this.http.get('http://localhost:8000/api/getUserApps', this.options)
      .map((response: Response) => {
        return response.json().apps;
      })
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  getProfileInfo(): Observable<any> {
    return this.http.get(
      'http://localhost:8000/api/getProfileInfo', this.options)
        .map((response: Response) => {
            this.store.dispatch({ type: NEWUSER, payload: response.json()});
            return response.json();
        })
        .catch((error: any) => Observable.throw(error.error || 'Server error')
        );
  }

  updateClientInfo(user: User): Observable<Object[]> {
    return this.http.post('http://localhost:8000/api/updateUserProfile', user, this.options)
      .map((response: Response) => {
        this.store.dispatch({ type: NEWUSERPROFILE, payload: user});
      })
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  createSubClient(user: User): Observable<Object[]> {
  return this.http.post('http://localhost:8000/api/createInternalUser', user, this.options)
    .map((response: Response) => {

    })
    .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  updateClientCompany(company: Client): Observable<Object[]> {
    return this.http.post('http://localhost:8000/api/updateUserCompany', company, this.options)
      .map((response: Response) => {
        this.store.dispatch({ type: NEWCOMPANY, payload: company});
        return response.json();
      })
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }


}
