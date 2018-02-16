import { ApiClient } from '../appsModule/core/service/api';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserAuthenticationService {
  public token: string;

  constructor(private router: Router, private api: ApiClient) {
   }

  signIn(userInfo: User): Observable<Comment[]> {
    // ...using get request
    localStorage.removeItem('currentUser');
    return this.api.post("https://contaduriabackend.herokuapp.com/api/authenticate",userInfo, )
      .map((response: any) => {
          let token = response && response.token;
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
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  
  register(userInfo: User): Observable<Comment[]> {
    // ...using get request
    return this.api.post("https://contaduriabackend.herokuapp.com/api/signup",userInfo)
      .map((response: any) => {
       let token = response && response.token;
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
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }

}
