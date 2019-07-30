import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { MenuController } from '@ionic/angular';

@IonicPage()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private form: FormGroup;

  constructor(
      private authService: AuthService,
      private router: Router,
      private storage: Storage,
      private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]),
      remember: new FormControl(false)
    });
  }

  OnSubmit() {
    console.log(this.form);
    // let credentials = {
    //   email: this.form.value.email,
    //   password: this.form.value.password
    // };
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.router.navigateByUrl('home'); // delete
    this.storage.set('role', 'admin');
    this.authService.loginUser(email, password).then(
        data => {
          console.log('Welcome');
          this.storage.set('role', 'admin');
          this.router.navigateByUrl('home');
        },
        error => {
          console.log(error);
        },
        // () => {
        //   // this.router.navigateByUrl('home');
        // }
    );
  }

}
