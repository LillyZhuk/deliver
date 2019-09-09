import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
import {ProfileService} from './services/profile.service';
import { Events } from '@ionic/angular';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

  public name: string;
  public email: string;
  public phone: string;
  public photoURL: string;
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
    private profileService: ProfileService,
    private storage: Storage,
    public events: Events
  ) {
    this.initializeApp();
    this.events.subscribe('user:login', () => {
      this.getData();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.authService.isLogged().then(value => {
      if (value) {
        this.getData();
      }
    });
  }

  ngAfterViewInit() {
    this.events.subscribe('user:change avatar', () => {
      this.getData();
    });
  }

  logout() {
    return this.authService.logOut().then(() => {
      return this.menuCtrl.enable(false);
    });
  }

  getData() {
    this.storage.get('user').then(val => {
       if (val != null) {
          this.name =  val.displayName;
          this.email = val.email;
          this.photoURL = val.photoURL;
      }
    });
  }
}
