import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Message } from '../../../../component/models/message.model';
import { ChatService } from '../../../../services/chat.service';
import * as moment from 'moment';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/takeWhile';

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
    },
    {
      text: 'hello',
      type: 'incoming',
    }
  ];
  // public messages: string[] = [];
  public message = {
    text: '',
    type: ''
  };
  secretCode: string;
  endConversationCode: string;

  public showEmojis = false;
  public score = {
    tone: '',
    score: 0,
  };

  constructor(
      private location: Location,
      private chatService: ChatService
  ) {
    this.secretCode = 'DONT TELL';
    this.endConversationCode = 'BYE BYE';
  }

  sendMessage() {
    this.message.type = 'outgoing';
    // this.chatService.sendMessage(message);
    this.messages.push(this.message);
  }

  ngOnInit() {
     this.getMessage();
  }

  getMessage() {
    // this.chatService.getMessages()
    //     .distinctUntilChanged()
    //     .filter((message: string) => message.trim().length > 0)
    //     .throttleTime(1000)
    //     .takeWhile((message) => message !== this.endConversationCode)
    //     .skipWhile((message) => message !== this.secretCode)
    //     .scan((acc: string, message: string, index: number) =>
    //         `${message}(${index + 1})`
    //     )
    //     .subscribe((message: string) => {
    //       const currentTime = moment().format('hh:mm:ss a');
    //       const messageWithTimestamp = `${currentTime}: ${message}`;
    //       this.messages.push(messageWithTimestamp);
    //     });
  }

  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }



  goBack(): void {
    this.location.back();
  }

}
