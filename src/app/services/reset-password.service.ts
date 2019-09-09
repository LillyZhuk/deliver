import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  async resetPassword(email) {
    const auth = firebase.auth();

    await auth.sendPasswordResetEmail(email);
  }
}
