import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpParams } from './httpparams';

@Injectable()
export class HttpService {

  constructor(private http : Http) { }
  
  //params should be its own object
  get(url: string, params?: HttpParams, auth?: string) {
    let formated_url = url + ( params === undefined || params === {} ? params.toString() : "" );

    let options = auth ? this.createAuthHeaderWithOptions(auth) : undefined;

    return this.http.get(formated_url, options);
  }

  post(url:string, body?: any, auth?: string) {
    return this.http.post(url, body);
  }

  delete(url: string, params?: HttpParams, auth?: string) {
    return this.http.delete(url);
  }


  private createAuthHeaderWithOptions(token: string): RequestOptions {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    return new RequestOptions({ headers: headers});
  }
}
