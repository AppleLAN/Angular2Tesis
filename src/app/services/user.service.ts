import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Company } from '../interfaces/company';
import { CompleteUser } from '../interfaces/complete.user';
import { User } from '../interfaces/user';
import { NEWCOMPANY, NEWUSER, NEWUSERPROFILE } from './../appsModule/shared/reducers/user.reducer';

@Injectable()
export class UserService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  userStorage: Observable<CompleteUser>;

  constructor(private store: Store<User>, private api: HttpClient) {
    this.userStorage = store.select('user');
  }

  getUserStorage(): Observable<CompleteUser> {
    return this.userStorage;
  }

  getUserApps(): Observable<any> {
    return this.api
      .get('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/getUserApps')
      .map((response: any) => {
        return response.apps;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getAllInternalUsers(): Observable<any> {
    return this.api
      .get('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/getAllInternalUsers')
      .map((response: any) => {
        return response.success;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getProfileInfo(): Observable<any> {
    return this.api
      .get('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/getProfileInfo')
      .map((response: any) => {
        this.store.dispatch({ type: NEWUSER, payload: response });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateClientInfo(user: User): Observable<Object[]> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/updateUserProfile', user)
      .map((response: Response) => {
        this.store.dispatch({ type: NEWUSERPROFILE, payload: user });
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  createSubClient(user: User): Observable<Object[]> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/createInternalUser', user)
      .map((response: Response) => {
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateClientCompany(company: Company): Observable<Object[]> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/updateUserCompany', company)
      .map((response: Response) => {
        delete company.type;
        this.store.dispatch({ type: NEWCOMPANY, payload: company });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteUser(user: User): Observable<Object[]> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/deleteUser', user)
      .map((response: Response) => {
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
