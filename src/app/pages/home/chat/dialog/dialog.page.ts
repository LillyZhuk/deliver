import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Message } from '../../../../component/models/message.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
})
export class DialogPage implements OnInit {

  public messages: Array<Message> = [
    {
      text: 'hi!',
      type: 'outgoing',
      id: '5'
    },
    {
      text: 'hello',
      type: 'incoming',
      id: '5'
    }
  ];
  public message: string = '';
  public showEmojis = false;
  public score = {
    tone: '',
    score: 0,
  };

  constructor(
      private location: Location,
  ) { }

  ngOnInit() {
  }

  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  sendMessage() {}

  goBack(): void {
    this.location.back();
  }

}
