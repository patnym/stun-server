import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpParams } from './httpparams';

@Injectable()
export class HttpService {

  constructor(private http : Http) { }
  
  //params should be its own object
  get(url: string, params?: HttpParams, token?: string) {
    return this.http.get(this.formatUrlFromParams(url, params), this.createAuthHeaderWithOptions(token));
  }

  post(url:string, body?: any, token?: string) {
    return this.http.post(url, body, this.createAuthHeaderWithOptions(token));
  }

  delete(url: string, params?: HttpParams, token?: string) {
    return this.http.delete(this.formatUrlFromParams(url, params), this.createAuthHeaderWithOptions(token));
  }

  private formatUrlFromParams(url, params: HttpParams) {
    if(params === undefined || Object.keys(params).length === 0)
      return url;

    return url + params.toString();
  }

  private createAuthHeaderWithOptions(token: string): RequestOptions {
    if(!token)
      return undefined

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    return new RequestOptions({ headers: headers});
  }
}
