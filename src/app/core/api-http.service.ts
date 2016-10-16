import { Inject, Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Request,
  RequestOptionsArgs,
  RequestOptions,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiHttpService {

  private idToken: string;

  constructor(private http: Http, idToken: Observable<string>) {
    idToken.subscribe((idToken: string) => this.idToken = idToken);
  }

  request(url: string|Request, options?: RequestOptionsArgs) : Observable<Response> {
    return this.http.request(url, this.mergeRequestOptions(options));
  }

  get(url: string, options?: RequestOptionsArgs) : Observable<Response> {
    return this.http.get(url, this.mergeRequestOptions(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response> {
    return this.http.post(url, body, this.mergeRequestOptions(options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response> {
    return this.http.put(url, body, this.mergeRequestOptions(options));
  }

  delete(url: string, options?: RequestOptionsArgs) : Observable<Response> {
    return this.http.delete(url, this.mergeRequestOptions(options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response> {
    return this.http.patch(url, body, this.mergeRequestOptions(options));
  }

  head(url: string, options?: RequestOptionsArgs) : Observable<Response> {
    return this.http.head(url, this.mergeRequestOptions(options));
  }

  options(url: string, options?: RequestOptionsArgs) : Observable<Response> {
    return this.http.options(url, this.mergeRequestOptions(options));
  }

  private maybeSetAuthorizationHeader(headers: Headers) {
    if (!this.idToken) return;
    if (headers.has('Authorization')) return;
    headers.set('Authorization', `Bearer ${this.idToken}`);
  }

  private mergeRequestOptions(options?: RequestOptionsArgs): RequestOptions {
    const mergedOptions = new RequestOptions().merge(options);
    if (!mergedOptions.headers) mergedOptions.headers = new Headers();
    this.maybeSetAuthorizationHeader(mergedOptions.headers);
    return mergedOptions;
  }

}
