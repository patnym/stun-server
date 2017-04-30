import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from '../http/http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: HttpService) { }

  login(username: string, password: string) {
    return this.http.post('/api/login', { username: username, password: password })
      .map((response: Response) => {
          console.log(response); 
          // login successful if there's a jwt token in the response
          let user = response.json();
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
          }
      });
  }

  createUser(username: string, password: string) {
    return this.http.post('/api/user', { username: username, password: password }, this.getToken())
      .map( (data: any) => {
        console.log(data);
      });
  }

  getToken() {
    let token = localStorage.getItem('currentUser');
    return token ? JSON.parse(token).token : undefined;
  }

  isAuthenticated() {
    return this.getToken() ? true : false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
