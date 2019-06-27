import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    public imgAvatar = '21225eba3212c72693d955dc1052fa5e_drawn-little-girl-braid-tumblr-pencil-and-in-color-drawn-little-little-girl-drawing-tumblr_720-713.jpeg';
    public secondImg = '../../../assets/dba6bae8c566f9d4041fb9cd9ada7741.png';
    public person = {
        name: 'Лилия',
        age: 18,
        bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        birthData: 17.04,
        email: 'some@email.com',
        tele: '555-55-55'
    }

  constructor() { }

  ngOnInit() {
  }

}
