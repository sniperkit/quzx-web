import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Token} from "../../login/credentials";
import {AppSettings} from "../app.settings";

@Injectable()
export class UserService {

  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username: string, password: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(AppSettings.API_ENDPOINT  + 'token-auth',
            '{"username":"' + username + '", "password": "' + password + '"}',
            { headers }
            )
      .map(res => res.json() as Token)
      .map((res) => {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
