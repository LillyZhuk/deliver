import {Component, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Storage } from '@ionic/storage';
import { Profile } from '../../component/models/profile.model';
import * as moment from 'moment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
    public secondImg = '../../../assets/dba6bae8c566f9d4041fb9cd9ada7741.png';
    public person = {};
    public age;
    public isLoaded: boolean = false;
    public sub;

    constructor(
      private profileService: ProfileService,
      private storage: Storage,
      private elementRef: ElementRef
  ) { }

  ngOnInit() {
        this.getProfile();
  }

  public getProfile() {
        this.storage.get('uid').then(val => {
            this.sub = this.profileService.getProfile(val)
                .subscribe(querySnapshot => {
                    querySnapshot.forEach(item => {
                        this.person = item.data();
                        console.log(item.data());
                        this.isLoaded = true;
                    });
                });
        });
  }

    public getAge(birthday): number {
        const currentTime = new Date();
        const birthDate: any = moment(birthday).format('x');
        this.age = ((currentTime.getTime() - birthDate) / 31556952000).toFixed(0);
        return this.age;
    }

    changeUserData() {}

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
