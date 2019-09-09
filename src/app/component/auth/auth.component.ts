import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  constructor(
      private router: Router,
      private menu: MenuController,
      private authService: AuthService,
  ) { }

  ionViewWillEnter() {
    this.authService.isLogged().then((value) => {
      if (value) {
        return this.router.navigateByUrl('home');
      }
    });
  }

  ngOnInit() {
    return this.router.navigate(['/login']);
  }

}
