import {Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
      private menu: MenuController,
      private profileService: ProfileService
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(
        data => {
          console.log(data)
        }
    );
  }

}
