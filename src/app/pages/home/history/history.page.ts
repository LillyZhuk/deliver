import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  isLoaded = false;

  public mocked = [
    {
      date: '26.06.19',
      order: 'Шаурма',
      filling: 'курица',
      addition: {
        mushrooms: false,
        cheese: 'сыр',
      },
      note: 'без лука',
      size: 'большая',
      quantity: 1,
      cafe: 'Best Grill',
      mushrooms: '',
      cheese: '',
    },
    {
      date: '24.06.19',
      order: 'Денер',
      filling: 'говядина',
      addition: {
        mushrooms: false,
        cheese: false,
      },
      note: 'без лука и зелени',
      size: 'обычный',
      quantity: 2,
      cafe: 'Best Grill',
      mushrooms: '',
      cheese: '',
    },
    {
      date: '21.06.19',
      order: 'Пицца',
      filling: 'Курица с ананасами',
      addition: {
        mushrooms: true,
        cheese: true,
      },
      note: 'без болгарского перца',
      size: '30 см',
      quantity: 1,
      cafe: 'Panda Menu',
      mushrooms: '',
      cheese: '',
    },
    {
      date: '19.06.19',
      order: 'Бургер',
      filling: 'Говяжий',
      addition: {
        mushrooms: false,
        cheese: false,
      },
      note: '',
      size: '',
      quantity: 1,
      cafe: 'Best Grill',
      mushrooms: '',
      cheese: '',
    },
    {
      date: '18.06.19',
      order: 'Денер',
      filling: 'говядина',
      addition: {
        mushrooms: true,
        cheese: true,
      },
      note: 'острый',
      size: 'большой',
      quantity: 1,
      cafe: 'Best Grill',
      mushrooms: '',
      cheese: '',
    },
  ];

  constructor() { }

  ngOnInit() {
    this.getHistory();
  }

  public getHistory() {
    this.mocked.forEach(item => {
      if (item.addition.mushrooms) {
        item.mushrooms = ', с грибами';
      }
      if (item.addition.cheese) {
        item.cheese = ', с сыром';
      }
    });
  }

}
