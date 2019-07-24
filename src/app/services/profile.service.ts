import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BASE_URL } from '../core/config';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs-compat/add/operator/mergeMap';
import { Profile } from '../component/models/profile.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public headers;

  constructor(
      private http: HttpClient,
      private storage: Storage
  ) {
     // this.getToken();
  }

  // getToken(): void {
  //     this.storage.get('token').then(val => {
  //        this.headers = new HttpHeaders().set('token', val);
  //        this.getProfile(this.headers);
  //     });
  // }

  public getProfile(token): Observable<Profile> {
      this.headers = new HttpHeaders().set('token', token);
      return this.http.get<Profile>(`${BASE_URL}/profile`, {
          headers: this.headers
      });
  }

  public editProfile(token, data): Observable<Profile> {
      this.headers = new HttpHeaders().set('token', token);
      return this.http.put<Profile>(`${BASE_URL}/profile`, data,{
          headers: this.headers
      });
  }
}
