import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ResetPasswordService} from '../../../services/reset-password.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent implements OnInit {

  public form: FormGroup;
  public sentEmail = false;

  constructor(
      private resetService: ResetPasswordService,
      private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  reset() {
    this.resetService.resetPassword(this.form.value.email).then(() => {
      this.sentEmail = true;
      setTimeout(() => {
        return this.router.navigate(['login']);
      }, 5000);
    });
  }

}
