import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
      private db: AngularFirestore,
  ) { }

  async deleteUser(value) {
    const user = firebase.auth().currentUser;
    return this.db.collection('profile').doc(`${value}`).delete().then(() => {
      return user.delete();
    }).catch((error) => {
      console.log(error);
    });
  }

  public changePassword(newPassword: string) {
    const user = firebase.auth().currentUser;
    return user.updatePassword(newPassword);
  }
}
