import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProfileService } from '../../services/profile.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public role;

  constructor(
      private menu: MenuController,
      private profileService: ProfileService,
      private storage: Storage
  ) {
    this.menu.enable(true);
    this.storage.get('role').then(val => {
      this.role = val;
    });
  }
}
