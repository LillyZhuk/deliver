import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProfileService } from '../../services/profile.service';
import { Storage } from '@ionic/storage';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public role;

  constructor(
      private menu: MenuController,
      private profileService: ProfileService,
      private authService: AuthService
  ) {
    this.role = this.authService.role;
    console.log(this.role);
  }
  ngOnInit(): void {
    this.menu.enable(true);
  }
}
