import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { User } from '../interfaces/user';

@Injectable()
export class UserAuthenticationService {
  public token: string;

  constructor(private router: Router, private api: HttpClient) {}

  signIn(userInfo: User): Observable<boolean> {
    // ...using get request
    localStorage.removeItem('currentUser');
    return this.api
      .post(
        'http://ec2-54-227-227-242.compute-1.amazonaws.com/api/authenticate',
        userInfo
      )
      .map((response: any) => {
        const token = response && response.token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ string: userInfo.email, token: token })
          );
          return true;
        } else {
          return false;
        }
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  register(userInfo: User): Observable<boolean> {
    // ...using get request
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/signup', userInfo)
      .map((response: any) => {
        const token = response && response.token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ string: userInfo.email, token: token })
          );
          return true;
        } else {
          return false;
        }
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
