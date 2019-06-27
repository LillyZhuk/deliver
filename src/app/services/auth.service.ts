import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../core/config';
import {Storage} from '@ionic/storage';
import { Token } from '../component/models/token.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;

  constructor(
      private http: HttpClient,
      private storage: Storage,
      private router: Router
  ) { }

  loginUser(credentials): Observable<Token> {
    return this.http.post<Token>(`${BASE_URL}login`, credentials);
  }

  registrUser(credentials): Observable<Token> {
    return this.http.post<Token>(`${BASE_URL}register`, credentials);
  }

  logOut() {
    this.storage.clear();
    this.router.navigateByUrl('/login');
  }

  loggenIn(): boolean {
    // return (localStorage.getItem('token') !== null);
    if (this.storage.get('token')) {
      return true;
    }
    return false;
  }

}
