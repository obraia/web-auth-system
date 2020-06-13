import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string =  environment.API;

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<any>(this.url + '/authenticate', user);
  }

  deleteUser(username: String) {
    return this.http.delete<any>(this.url + `/users/${username}`);
  }
}