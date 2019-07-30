import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  // public showChangesPass: boolean = false;
  // public showChangesEmail: boolean = false;
  // public showChangesName: boolean = false;
  // public titlePass: string = 'пароль';
  // public titleEmail: string = 'почту/телефон';
  // public titleName: string = 'имя';
  // private title: string;
  private form: FormGroup;

  constructor(
      private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      // age: new FormControl('')
    });
  }

  // showDivPass() {
  //   this.showChangesEmail = false;
  //   this.showChangesName = false;
  //   this.showChangesPass = !this.showChangesPass;
  //   this.title = this.titlePass;
  // }
  //
  // showDivEmail() {
  //   this.showChangesPass = false;
  //   this.showChangesName = false;
  //   this.showChangesEmail = !this.showChangesEmail;
  //   this.title = this.titleEmail;
  // }
  //
  // showDivName() {
  //   this.showChangesPass = false;
  //   this.showChangesEmail = false;
  //   this.showChangesName = !this.showChangesName;
  //   this.title = this.titleName;
  // }
  //
  // changeValue(newValue) {
  //   if (this.title === this.titlePass) {
  //     console.log(newValue, 'parentPass');
  //   }
  //   if (this.title === this.titleEmail) {
  //     console.log('email');
  //   }
  //   if (this.title === this.titleName) {
  //     console.log('hi');
  //   }
  // }
  //
  // public showDiv(showChangesOne, showChangesTwo): void {
  //   showChangesOne = false;
  //   showChangesTwo = false;
  //   this.showChangesName = !this.showChangesName;
  //   this.title = this.titleName;
  // }
  onSubmit(value) {
    // this.profileService.createProfile(value)
    //     .then(
    //         res => {
    //           console.log('fine');
    //         }
    //     );
  }

}
