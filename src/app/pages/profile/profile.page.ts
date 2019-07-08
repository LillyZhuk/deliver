import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Storage } from '@ionic/storage';
import { Profile } from '../../component/models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    public imgAvatar = '../../../assets/21225eba3212c72693d955dc1052fa5e_drawn-little-girl-braid-tumblr-pencil-and-in-color-drawn-little-little-girl-drawing-tumblr_720-713.jpeg';
    public secondImg = '../../../assets/dba6bae8c566f9d4041fb9cd9ada7741.png';
    public person: Profile;
    public age;

  constructor(
      private profileService: ProfileService,
      private storage: Storage
  ) { }

  ngOnInit() {
        this.getUserData();
  }

  public getUserData() {
        this.storage.get('token').then(token => {
            // const subject = new BehaviorSubject(this.profileService.someMethod(token));
            this.profileService.getProfile(token).subscribe(data => {
                console.log(data, 'data');
                this.person = data;
                this.age = this.getAge(this.person.birthday);
            });
        });
  }

  public changeUserData() {
      // this.storage.get('token').then(token => {
      //     this.profileService.editProgile(token).subscribe(data => {
      //         console.log('Edit user data');
      //     });
      // });
      console.log(this.person);
  }

    getAge(birthdate) {
        let currentTime = new Date();
        //     let abc = birthdate.getTime();
        //     return ((currentTime - abc) / 31556952000).toFixed(0);
        // }
    }

}
