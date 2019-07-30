import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import {ActivatedRoute} from '@angular/router';

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

  public menu: Menu[] = [
    {
      id: 1,
      title: 'Шаурма',
      price: 45,
      img: '../../../../../assets/640m.jpg'
    },
    {
      id: 2,
      title: 'Денер',
      price: 45,
      img: '../../../../../assets/1368744-ab68037eedf348b6bf565ac174c3bc3a-450x300.jpeg'
    },
    {
      id: 3,
      title: 'Бургер',
      price: 30,
      img: '../../../../../assets/burger.jpeg'
    },
    {
      id: 4,
      title: 'Чизбургер',
      price: 35,
      img: '../../../../../assets/Populjarnyj-fast-fud-s-syrom.jpg'
    },
    {
      id: 5,
      title: 'Хот Дог',
      price: 25,
      img: '../../../../../assets/hotdog.jpg'
    },
    {
      id: 6,
      title: 'Хот Дог по французски',
      price: 25,
      img: '../../../../../assets/orig.jpeg'
    },
    {
      id: 7,
      title: 'Сыр в лаваше',
      price: 25,
      img: '../../../../../assets/syr-1.jpg'
    },
    {
      id: 8,
      title: 'Филе куринное',
      price: 33,
      img: '../../../../../assets/48036.jpg'
    },
    {
      id: 9,
      title: 'Филе свинное',
      price: 38,
      img: '../../../../../assets/eff84bb8115105d_600x400.jpg'
    }
  ];
  public cafeId: number;

  constructor(
      private location: Location,
      public modalController: ModalController,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cafeId = +this.activatedRoute.snapshot.paramMap.get('cafeId');
  }

  async presentModal(m: Menu) {
      const modal = await this.modalController.create({
        component: ModalPage,
        componentProps: {
          menu: m,
          cafeId: this.cafeId
        }
      });
      return await modal.present();
    }

  goBack(): void {
    this.location.back();
  }

}

