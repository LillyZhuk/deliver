import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BASE_URL } from '../core/config';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs-compat/add/operator/mergeMap';

export interface Profile {
    birthday: string;
    phone: string;
    bio: string;
    login: string;
    email: string;
}


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
      this.getToken();
  }

    getToken(): void {
        this.storage.get('token').then(val => {
            this.headers = new HttpHeaders().set('token', val);
            this.someMethod().subscribe(
                data => {
                    console.log(data);
                }
            );
        });
    }

    public someMethod(): Observable<Profile> {
        return this.http.get<Profile>(`${BASE_URL}/profile`, {
            headers: this.headers
        });
    }
}
