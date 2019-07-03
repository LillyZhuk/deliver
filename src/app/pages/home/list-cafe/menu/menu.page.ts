import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public menu = [
    {
      title: 'Шаурма',
      price: 45,
      img: '../../../../../assets/640m.jpg'
    },
    {
      title: 'Денер',
      price: 45,
      img: '../../../../../assets/1368744-ab68037eedf348b6bf565ac174c3bc3a-450x300.jpeg'
    },
    {
      title: 'Бургер',
      price: 30,
      img: '../../../../../assets/burger.jpeg'
    },
    {
      title: 'Чизбургер',
      price: 35,
      img: '../../../../../assets/Populjarnyj-fast-fud-s-syrom.jpg'
    },
    {
      title: 'Хот Дог',
      price: 25,
      img: '../../../../../assets/hotdog.jpg'
    },
    {
      title: 'Хот Дог по французски',
      price: 25,
      img: '../../../../../assets/orig.jpeg'
    },
    {
      title: 'Сыр в лаваше',
      price: 25,
      img: '../../../../../assets/syr-1.jpg'
    },
    {
      title: 'Филе куринное',
      price: 33,
      img: '../../../../../assets/48036.jpg'
    },
    {
      title: 'Филе свинное',
      price: 38,
      img: '../../../../../assets/eff84bb8115105d_600x400.jpg'
    }
  ];

  constructor(
      private location: Location,
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
