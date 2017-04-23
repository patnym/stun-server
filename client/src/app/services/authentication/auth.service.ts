import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  login(username: String, password: String) {
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

  getToken() {
    return localStorage.getItem('currentUser');
  }

  isAuthenticated() {
    return this.getToken() ? true : false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
