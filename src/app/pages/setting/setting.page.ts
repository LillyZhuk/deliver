import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

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

  onSubmit(value) {

  }

}
