import { Component, OnInit } from '@angular/core';
import {DialogPage} from './dialog/dialog.page';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  first: '';
  public secondImg = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
  id = 17;
  // rooms = [];
  // ref = firebase.database().ref('chatrooms/');

  constructor(
      // public navCtrl: NavController,
      // public navParams: NavParams
  ) {
    // this.ref.on('value', resp => {
    //   this.rooms = [];
    //   this.rooms = snapshotToArray(resp);
    // });
  }

  ngOnInit() {
  }

  addRoom() {
   // this.navCtrl.push();
  }

  // joinRoom(key) {
  //   this.navCtrl.setRoot(ChatPage, {
  //     key: key,
  //     nickname: this.navParams.get('nickname')
  //   });
  // }

}
