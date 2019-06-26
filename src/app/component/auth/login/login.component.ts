import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../../home/home.page';

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
      public afAuth: AngularFireAuth,
      public navCtrl: NavController,
      public navParams: NavParams
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9 ]*')]),
      remember: new FormControl(false, [Validators.requiredTrue])
    });
  }

  OnSubmit() {
    let credentials = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    if (!credentials.email) {
      return;
    }
    this.authService.loginUser(credentials).then(
        () => this.navCtrl.setRoot(HomePage),
    );
  }

}
