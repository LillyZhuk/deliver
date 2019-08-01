import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../../services/order.service';

interface Menu {
  id: number;
  title: string;
  price: number;
  img: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public menu = [];
  public cafe: string;
  public data = [];

  constructor(
      private location: Location,
      public modalController: ModalController,
      private activatedRoute: ActivatedRoute,
      private orderService: OrderService
  ) { }

  ngOnInit() {
    this.cafe = this.activatedRoute.snapshot.params.cafeId;
    this.getMenu();
  }

  async presentModal(m) {
      const modal = await this.modalController.create({
        component: ModalPage,
        componentProps: {
          menu: m,
          cafe: this.cafe
        }
      });
      return await modal.present();
    }

  goBack(): void {
    this.location.back();
  }

  public getMenu() {
    this.orderService.getMenu().subscribe(
        querySnapshot => {
          querySnapshot.forEach(item => {
              this.data.push(item.data());
          });
          this.data.forEach(value => {
            if (value.cafe === this.cafe) {
              this.menu.push(value);
            }
          });
        });
  }

}

