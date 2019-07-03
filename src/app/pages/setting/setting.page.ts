import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  public showChangesPass: boolean = false;
  public showChangesEmail: boolean = false;
  public titlePass: string = 'пароль';
  public titleEmail: string = 'почту/телефон';
  private title: string;

  constructor() { }

  ngOnInit() {
  }

  showDivPass() {
    if (this.showChangesEmail) {
      this.showChangesEmail = false;
    }
    this.showChangesPass = !this.showChangesPass;
    this.title = this.titlePass;
  }

  showDivEmail() {
    if (this.showChangesPass) {
      this.showChangesPass = false;
    }
    this.showChangesEmail = !this.showChangesEmail;
    this.title = this.titleEmail;
  }

  changeValue(newValue) {
    if (this.title === this.titlePass) {
      console.log(newValue, 'parentPass');
    }
    if (this.title === this.titleEmail) {
      console.log('email');
    }
  }

}
