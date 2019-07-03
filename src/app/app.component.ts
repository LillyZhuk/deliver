import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  first: './../assets/21225eba3212c72693d955dc1052fa5e_drawn-little-girl-braid-tumblr-pencil-and-in-color-drawn-little-little-girl-drawing-tumblr_720-713.jpeg';
  public secondImg = '../../../assets/dba6bae8c566f9d4041fb9cd9ada7741.png';
  public appPages = [
    {
      title: ' Профиль',
      url: '/profile',
      icon: 'person'
    },
    {
      title: ' Настройки',
      url: '/setting',
      icon: 'build'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private menuCtrl: MenuController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.authService.getToken();
    });
  }

  logout() {
    this.authService.logOut();
    this.menuCtrl.enable(false);
  }
}
