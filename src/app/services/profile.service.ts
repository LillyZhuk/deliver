import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BASE_URL } from '../core/config';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs-compat/add/operator/mergeMap';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public headers;
  public token;

  constructor(
      private http: HttpClient,
      private storage: Storage
  ) {
  }

  // getToken() {
  //   return  Observable.fromPromise(this.storage.get('token'));
  // }

  getProfile() {
      this.storage.get('token').then(val => {
        this.token = val;
      });
      this.headers = new HttpHeaders().set('token', this.token);
      return this.http.get<any>(`${BASE_URL}/profile`, {
          headers: this.headers
      });
  }
}
