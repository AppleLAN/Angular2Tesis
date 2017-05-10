import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs/Rx';
import { Router, CanActivate } from '@angular/router';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserAuthenticationService {
  public token: string;

  constructor(private http: Http, private router: Router) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
   }

  signIn(userInfo: User): Observable<Comment[]> {
    // ...using get request
    return this.http.post("http://localhost:8000/api/authenticate",userInfo)
      .map((response: Response) => {
          let token = response.json() && response.json().token;
          if (token) {
            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({string: userInfo.email , token: token }));
            return true;
          }
          else {
            return false;
          }
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  register(userInfo: User): Observable<Comment[]> {
    // ...using get request
    return this.http.post("http://localhost:8000/api/signup",userInfo)
      .map((response: Response) => {
       let token = response.json() && response.json().token;
          if (token) {
            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({string: userInfo.email , token: token }));
            return true;
          }
          else {
            return false;
          }
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }

}
