import { Headers } from '@angular/http';
import {HttpHeaders} from '@angular/common/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('Authorization', localStorage.getItem('auth_token'));

export const requestHeaders = new HttpHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem('auth_token')
});

