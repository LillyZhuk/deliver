import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
    let credentials = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.loginUser(credentials).subscribe(
        data => {
          console.log('Welcome');
          this.storage.set('role', 'admin');
        },
        error => {
          console.log(error);
        },
        () => {
          this.router.navigateByUrl('home');
        }
    );
  }

}
