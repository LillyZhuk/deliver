import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BASE_URL } from '../core/config';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs-compat/add/operator/mergeMap';
import { Profile } from '../component/models/profile.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public headers;

    constructor(
      private http: HttpClient,
      private storage: Storage,
      private afAuth: AngularFireAuth,
      private db: AngularFirestore,
  ) {
     // this.getToken();
  }

  // getToken(): void {
  //     this.storage.get('token').then(val => {
  //        this.headers = new HttpHeaders().set('token', val);
  //        this.getProfile(this.headers);
  //     });
  // }

  public getProfile(uid) {
      // return this.db.collection('profile').doc(`Qg6VW2ThBlYxsDqEzwRrWO4rD6N2`).get();
      // let uid = firebase.auth().currentUser.uid;
      console.log(uid);
      return this.db.collection('profile', ref => ref.where('userId', '==', uid)).get();
  }

  public createProfile(uid, emailUser, userName) {
        return this.db.collection('profile').doc(`${uid}`).set({
            email: emailUser,
            name: userName,
            nameToSearch: userName.toLowerCase(),
            surname: '',
            role: 'user',
            userId: uid,
            birthday: new Date(),
            phone: '',
            bio: '',
            avatar: 'data:image/png;base64,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'
        });
  }

  // public editProfile(token, person): Observable<Profile> {
  //     this.headers = new HttpHeaders().set('token', token);
  //     return this.http.put<Profile>(`${BASE_URL}/profile`, person, {
  //         headers: this.headers
  //     });
  // }
}
