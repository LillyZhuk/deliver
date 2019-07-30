import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ModalController, MenuController, NavController } from '@ionic/angular';
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
  ) {
    this.menu.enable(false);
  }

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if (this.authService.isLoggedIn) {
        this.router.navigateByUrl('home');
      }
    });
  }

  ngOnInit() {
    this.router.navigate(['/login']);
  }

}
