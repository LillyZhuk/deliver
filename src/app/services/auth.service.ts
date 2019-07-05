import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../core/config';
import { Storage } from '@ionic/storage';
import { Router} from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: any;
  isLoggedIn = false;

  constructor(
      private http: HttpClient,
      private storage: Storage,
      private router: Router
  ) { }

  loginUser(credentials) {
    return this.http.post(`${BASE_URL}/auth/login`, credentials).pipe(
        tap(token => {
          this.storage.set('token', token)
              .then(
                  () => {
                    console.log('Token Stored');
                  },
                  error => console.error('Error storing item', error)
              );
          this.token = token;
          this.isLoggedIn = true;
          return token;
        }),
    );

  }

  registrUser(credentials) {
    return this.http.post(`${BASE_URL}/auth/register`, credentials);
  }

  logOut() {
    this.router.navigateByUrl('/login');
    this.storage.remove('token');
    this.isLoggedIn = false;
    delete this.token;
  }

  getToken() {
    return this.storage.get('token').then(
        data => {
          this.token = data;
          if (this.token != null) {
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
        },
        error => {
          this.token = null;
          this.isLoggedIn = false;
        }
    );
  }


}
