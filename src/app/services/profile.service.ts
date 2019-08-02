import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BASE_URL } from '../core/config';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs-compat/add/operator/mergeMap';
import { Profile } from '../component/models/profile.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


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
  ) { }

  public getProfile(uid): Observable<any> {
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
            birthday: '',
            phone: '',
            bio: '',
            avatar: 'f6b60798-1743-4d13-9b7d-e6633132f2d8'
        });
  }

  public editProfile(uid, data) {
      return this.db.collection('profile').doc(`${uid}`).update({
          bio: data.bio,
          birthday: data.birthday,
          phone: data.phone
      });
  }

    public changeImg(uid, data) {
        return this.db.collection('profile').doc(`${uid}`).update({
            avatar: data.file
        });
    }

    public uploadImg(data) {
        return this.http.post<any>('https://upload.uploadcare.com/base/', data);
    }

    public deleteImg(uid) {
        return this.db.collection('profile').doc(`${uid}`).update({
            avatar: 'f6b60798-1743-4d13-9b7d-e6633132f2d8'
        });
    }
}
