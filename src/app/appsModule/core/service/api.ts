import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http,
  XHRBackend,
  Headers
} from '@angular/http';
import { Observable } from 'rxjs/Rx';

export function httpFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions
): Http {
  return new ApiClient(xhrBackend, requestOptions);
}

@Injectable()
export class ApiClient extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(
    url: string | Request,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.getRequestOptionArgs(options));
  }

  post(
    url: string,
    body?: any,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(
    url: string,
    body: string,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.getRequestOptionArgs(options));
  }

  private getRequestOptionArgs(
    options?: RequestOptionsArgs
  ): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    options.headers.append('Authorization', 'Bearer' + token);
    options.headers.append('Referrer Policy', 'origin');

    return options;
  }
}
