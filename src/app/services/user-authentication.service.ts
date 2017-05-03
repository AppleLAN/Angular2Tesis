import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user.interface';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserAuthenticationService {

  constructor (private http: Http) {}
  register(userInfo: User) : Observable<Comment[]> {
     // ...using get request
         return this.http.get(this.commentsUrl)
              // ...and calling .json() on the response to return data
                .map((res:Response) => res.json())
                //...errors if any
                .catch((error:any) => Observable.throw(error.json().error || 'Server error')
  }

}
