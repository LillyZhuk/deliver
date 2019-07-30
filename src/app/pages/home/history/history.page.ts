import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  isLoaded = false;
  userRole: string;

  public mocked = [
    {
      id: 1,
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
      status: true,
    },
    {
      id: 2,
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
      status: false,
    },
    {
      id: 3,
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
      status: true,
    },
    {
      id: 4,
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
      status: false,
    },
    {
      id: 5,
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
      status: false,
    },
  ];

  public mockedAdmin = [
    {
      id: 1,
      user: 'Мистер Андерсон',
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
      status: true,
    },
    {
      id: 2,
      user: 'Агент Смит',
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
      status: false,
    },
    {
      id: 3,
      user: 'Морфеуc',
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
      status: false,
    },
    {
      id: 4,
      user: 'Тринити',
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
      status: false,
    },
    {
      id: 5,
      user: 'Оракул',
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
      status: false,
    },
  ];

  constructor(
      private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('role').then(role => {
      if (role === 'admin') {
        this.userRole = role;
        this.getOrders();
      }
      if (role === 'user') {
        this.userRole = role;
        this.getHistory();
      }
    });
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

  getOrders() {
    this.mockedAdmin.forEach( item => {
      if (item.addition.mushrooms) {
        item.mushrooms = ', с грибами';
      }
      if (item.addition.cheese) {
        item.cheese = ', с сыром';
      }
    });
  }

  takeOrder(value) {
    value['status'] = true;
    console.log(value);
  }

  deleteOrder(i) {
    this.mockedAdmin.splice(i, 1);
  }

  getClasses(messageType) {
    if (!messageType) {
      return messageType = 'accepted';
    }
  }
}
