import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    const authReq = request.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token
      })
    });

    return next.handle(authReq).pipe(
      map((ev: HttpEvent<any>) => {
        return ev;
      }),
      catchError(error => {
        if (error.status === 401) {
          if (!error.error.includes('invalid_credentials')) {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/no-auth']);
          }
        }
        return Observable.throw(error);
      })
    );
  }
}
