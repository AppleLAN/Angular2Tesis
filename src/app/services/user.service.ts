import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { User } from '../interfaces/user';
import { Client } from '../interfaces/client';
import { CompleteUser } from '../interfaces/complete.user';

import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { NEWUSER, NEWCOMPANY, NEWUSERPROFILE } from './../appsModule/shared/reducers/user.reducer';

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
  constructor(private store: Store<User>, private api: Http) {
    this.userStorage = store.select('user');
   }

  getUserStorage(): Observable<CompleteUser> {
      return this.userStorage;
  }

  getUserApps(): Observable<any> {
    return this.api.get('https://contaduriabackend.herokuapp.com/api/getUserApps')
      .map((response: any) => {
        return response.json().apps;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getProfileInfo(): Observable<any> {
    return this.api.get(
      'https://contaduriabackend.herokuapp.com/api/getProfileInfo')
        .map((response: Response) => {
            this.store.dispatch({ type: NEWUSER, payload: response.json()});
            return response.json();
        })
        .catch((error: any) => Observable.throw(error || 'Server error')
        );
  }

  updateClientInfo(user: User): Observable<Object[]> {
    return this.api.post('https://contaduriabackend.herokuapp.com/api/updateUserProfile', user)
      .map((response: Response) => {
        this.store.dispatch({ type: NEWUSERPROFILE, payload: user});
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  createSubClient(user: User): Observable<Object[]> {
  return this.api.post('https://contaduriabackend.herokuapp.com/api/createInternalUser', user)
    .map((response: Response) => {
      return response.json();
    })
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateClientCompany(company: Client): Observable<Object[]> {
    return this.api.post('https://contaduriabackend.herokuapp.com/api/updateUserCompany', company)
      .map((response: Response) => {
        delete company.type;
        this.store.dispatch({ type: NEWCOMPANY, payload: company});
        return response.json();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteUser(user: User): Observable<Object[]> {
    return this.api.post('https://contaduriabackend.herokuapp.com/api/deleteUser', user)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
    }


}
