import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defaultImg } from '../core/config';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';
import { Profile } from '../component/models/profile.model';
import {DataFile} from '../component/models/file';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    constructor(
      private http: HttpClient,
      private storage: Storage,
      private afAuth: AngularFireAuth,
      private db: AngularFirestore,
      public events: Events
  ) { }

  public getProfile(uid): Observable<firebase.firestore.QuerySnapshot> {
      return this.db.collection('profile', ref => ref.where('userId', '==', uid)).get();
  }

  async createProfile(uid, emailUser, userName): Promise<void> {
       await this.db.collection('profile').doc(`${uid}`).set({
            email: emailUser,
            name: userName,
            nameToSearch: userName.toLowerCase(),
            surname: '',
            role: 'user',
            userId: uid,
            birthday: '',
            phone: '',
            bio: '',
            avatar: defaultImg
        });
  }

  async editProfile(uid: string, data: Profile): Promise<void>  {
     await this.db.collection('profile').doc(`${uid}`).update({
          bio: data.bio,
          birthday: data.birthday,
          phone: data.phone
      });
  }

    async changeImg(uid, data): Promise<void> {
        await this.db.collection('profile').doc(`${uid}`).update({
            avatar: data.file
        }).then(() => {
             this.storage.get('user').then(value => {
                this.updateCurrentUser(value.displayName, data.file);
            });
        });
    }

   uploadImg(data: FormData): Promise<DataFile> {
        return this.http.post<DataFile>('https://upload.uploadcare.com/base/', data).toPromise();
    }

    async deleteImg(uid: string): Promise<void> {
       await this.db.collection('profile').doc(`${uid}`).update({
            avatar: defaultImg
        }).then(() => {
            this.storage.get('user').then(value => {
                this.updateCurrentUser(value.displayName, defaultImg);
            });
        });
    }

    public updateCurrentUser(name: string, file: string): Promise<any> {
        const currentUser = firebase.auth().currentUser;
        return currentUser.updateProfile({
            displayName: name,
            photoURL: file
        }).then(() => {
            firebase.auth().onAuthStateChanged((val) => {
               return this.storage.set('user', val.providerData[0]).then(() => {
                   return this.events.publish('user:change avatar');
               });
            });
        } );
    }
}
