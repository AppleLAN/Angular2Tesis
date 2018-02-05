import { Injectable } from '@angular/core';
import { RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiClient {
  constructor(private http: Http) {}

  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    return this.http.request(url, options)
      .catch(res => Observable.of(res))
      .flatMap(this.handleResponse);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.http.get(url, this.getRequestOptionArgs(options))
      .catch(res => Observable.of(res))
      .flatMap(this.handleResponse);
  }

  post(url: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
    return this.http.post(url, body, this.getRequestOptionArgs(options))
      .catch(res => Observable.of(res))
      .flatMap(this.handleResponse);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.http.delete(url, this.getRequestOptionArgs(options))
      .catch(res => Observable.of(res))
      .flatMap(this.handleResponse);
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    options.headers.append('Authorization', 'Bearer' + token);

    return options;
  }

  private handleResponse(res: Response): Observable<Object> {
    try {
      const parsed = res.json();
      if (parsed) {
        return Observable.of(parsed);
      } else {
        return Observable.throw(parsed);
      }
    } catch (err) {
      return Observable.throw({ status: res.status, statusText: res.statusText });
    }
  }
}
