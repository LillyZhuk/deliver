import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { IonicPage } from 'ionic-angular';
import {User} from '../../models/user';

@IonicPage()
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup;
  public loading = false;
  public credentials: User;

  constructor(
      private authService: AuthService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      agree: new FormControl(null, [Validators.required]),
    });
  }

  public OnSubmit(): Promise<any> {
    const credentials = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name
    };
    this.loading = true;
    return this.authService.registerUser(credentials).then(
        data => {
          return this.router.navigate(['/login']);
        }
    );
  }

}
