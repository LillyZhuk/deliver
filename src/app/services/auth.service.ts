import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';

import { ProfileService } from './profile.service';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';
import {defaultImg} from '../core/config';
import UserCredential = firebase.auth.UserCredential;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
      private storage: Storage,
      private router: Router,
      public fAuth: AngularFireAuth,
      public events: Events,
      private profileService: ProfileService
  ) {}

  public loginUser(email: string, password: string): Promise<void | any[]> {
      return this.fAuth.auth.signInWithEmailAndPassword(email, password).then(
          (res: UserCredential) => {
              return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
                  return this.storage.set('uid', res.user.uid).then(() => {
                      return this.storage.set('user', res.user.providerData[0]).then(() => {
                          return this.events.publish('user:login');
                      });
                  }, error => console.error('Error storing item', error));
              });
          });

  }

  public registerUser(user): Promise<any> {
     return this.fAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
         (res: firebase.auth.UserCredential) => {
             return this.profileService.createProfile(res.user.uid, user.email, user.name);
         }).then(() => {
         return this.profileService.updateCurrentUser(user.name, defaultImg);
         });
  }

  public logOut(): Promise<any> {
    return this.storage.clear().then(() => {
        return this.router.navigateByUrl('/login').then(() => {
            return this.fAuth.auth.signOut();
        });
    });
  }

    public isLogged(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value === true;
        });
    }


}
