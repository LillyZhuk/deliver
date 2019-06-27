import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  first: '';
  public secondImg = '../../../assets/dba6bae8c566f9d4041fb9cd9ada7741.png';
  id = 17;

  constructor() { }

  ngOnInit() {
  }

}
