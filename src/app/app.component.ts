import {Component, OnInit, OnDestroy} from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
import {ProfileService} from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  public name: string;
  public email: string;
  public phone: string;
  public person = {};
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
  public user;
  public sub;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private menuCtrl: MenuController,
    private profileService: ProfileService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      // this.authService.getToken();
    });
  }

  logout() {
    this.authService.logOut();
    this.menuCtrl.enable(false);
  }

  ngOnInit(): void {
    // this.getData();
    this.getData();
    }

  getData() {
    this.storage.get('uid').then(val => {
      this.sub = this.profileService.getProfile(val)
          .subscribe(querySnapshot => {
            querySnapshot.forEach(item => {
              this.person = item.data();
            });
          });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
