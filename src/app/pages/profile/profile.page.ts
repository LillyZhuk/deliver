import {Component, ElementRef, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Storage } from '@ionic/storage';
import { Profile } from '../../component/models/profile.model';
import * as moment from 'moment';
import {FormGroup} from "@angular/forms";

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
    public isLoaded: boolean = false;

  constructor(
      private profileService: ProfileService,
      private storage: Storage,
      private elementRef: ElementRef
  ) { }

  ngOnInit() {
        this.getUserData();
  }

  public getUserData() {
        this.storage.get('token').then(token => {
            // const subject = new BehaviorSubject(this.profileService.someMethod(token));
            this.profileService.getProfile(token).subscribe(data => {
                this.person = data;
                this.getAge(this.person.birthday);
                this.isLoaded = true;
            });
        });
  }

  public changeUserData() {
      this.storage.get('token').then(token => {
          this.profileService.editProfile(token, this.person).subscribe(data => {
              this.getUserData();
          });
      });
  }

    public getAge(birthday): number {
        const currentTime = new Date();
        const birthDate: any = moment(birthday).format('x');
        this.age = ((currentTime.getTime() - birthDate) / 31556952000).toFixed(0);
        return this.age;
    }

}
