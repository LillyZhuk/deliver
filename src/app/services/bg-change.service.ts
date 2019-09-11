import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BgChangeService {

  constructor(
      private storage: Storage,
      private afAuth: AngularFireAuth,
      private db: AngularFirestore,
      public events: Events
  ) { }

  async changeBg(data, uid): Promise<void> {
    this.db.collection('profile').doc(`${uid}`).update({
        background: data.file
    }).then(() => {
        this.events.publish('background:change');
    });
  }
}
