import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../core/config';
import { Storage } from '@ionic/storage';
import { Router} from '@angular/router';
import { tap } from 'rxjs/operators';
import { ProfileService } from './profile.service';
import { User } from '../component/models/user';
import {AngularFireAuth} from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: any;
  isLoggedIn = false;
  public data;
  public role: string;

  constructor(
      private http: HttpClient,
      private storage: Storage,
      private router: Router,
      private profileService: ProfileService,
      public fAuth: AngularFireAuth,
  ) {}

  loginUser(email, password) {
      return this.fAuth.auth.signInWithEmailAndPassword(email, password).then(
          (res: any) => {
              console.log(res);
              this.token = res.user.ra;
              this.storage.set('token', this.token);
              this.storage.set('uid', res.user.uid).then(
                  () => {
                      this.profileService.getProfile(res.user.uid)
                          .subscribe(querySnapshot => {
                              querySnapshot.forEach(item => {
                                  this.data = item.data();
                              });
                              this.role = this.data.role;
                              console.log(this.role, 'role auth')
                              this.storage.set('role', this.data.role);
                              this.storage.set('name', this.data.name);
                          });
                      console.log('Token Stored');
                  }, error => console.error('Error storing item', error));
              this.isLoggedIn = true;
              return this.token;
              },
    );

  }

  registerUser(email, password) {
    // return this.http.post<User>(`${BASE_URL}/auth/register`, credentials);
     return this.fAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logOut() {
    this.router.navigateByUrl('/login');
    this.storage.remove('token');
    this.storage.clear();
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
