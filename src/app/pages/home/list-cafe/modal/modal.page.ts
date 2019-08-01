import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Order } from '../../../../component/models/order';
import {OrderService} from '../../../../services/order.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  public form: FormGroup;
  public img = '../../../../assets/shapes.svg';
  public data;
  public id;
  public meatList = [
    { title: 'курица', color: 'success', value: 'chicken', name: 'meat' },
    { title: 'говядина', color: 'tertiary', value: 'beef', name: 'meat' },
    { title: 'свинина', color: 'danger', value: 'pork', name: 'meat' }
  ];
  public sizeList = [
    { title: 'большой(-ая)', color: 'success', value: 'big', name: 'size' },
    { title: 'маленький(-ая)', color: 'tertiary', value: 'small', name: 'size' }
  ];
  public filling: string;
  public order: Order = {
  order: '',
  filling: '',
  addition: {
    mushrooms: null,
    cheese: null,
  },
  note: '',
  size: '',
  quantity: null,
  cafe: '',
  name: '',
  userId: ''
  };
  public additionList = [
    { name: 'mushrooms', checked: false, color: 'primary', title: 'грибы' },
    { name: 'cheese', checked: false, color: 'tertiary', title: 'сыр' }
  ];
  public addition = {
    mushrooms: false,
    cheese: false,
  };
  public quantity: number;
  public size: string;

  constructor(
      private modalCtrl: ModalController,
      public loadingController: LoadingController,
      private navParams: NavParams,
      private orderService: OrderService,
      private storage: Storage
  ) { }

  ngOnInit() {
    this.data = this.navParams.get('menu');
    this.id = this.navParams.get('cafe');
    this.storage.get('name').then(val => {
      this.order.name = val;
    });
    this.storage.get('uid').then(val => {
      this.order.userId = val;
    });
  }

  public close(): void {
      this.modalCtrl.dismiss();
  }

  public radioSelect(meat): string {
     return this.filling = meat;
  }

  checkEvent(val) {
    if (val === 'mushrooms') {
      this.addition.mushrooms = !this.addition.mushrooms;
    }
    if (val === 'cheese') {
      this.addition.cheese = !this.addition.cheese;
    }
    return this.addition;
  }

  public radioSelectSize(size): string {
    return this.size = size;
  }

  public send(form): void {
    this.order.cafe = this.data.cafe;
    if (this.filling === undefined) {
      this.order.filling = '';
    } else {
      this.order.filling = this.filling;
    }
    // this.order.filling = this.filling;
    this.order.order = this.data.title;
    this.order.addition = this.addition;
    this.order.quantity = form.value.quantity;
    if (this.size === undefined) {
      this.order.size = '';
    } else {
      this.order.size = this.size;
    }
    // this.order.size = this.size;
    this.order.note = form.value.note;
    this.order.id = Math.random() * 100;
    console.log(this.order, form.value, 'modal page');
    console.log('sending...');
    this.orderService.createOrder(this.order).then(
        res => {
          console.log('Order is created!');
        }
    );
    this.presentLoadingWithOptions();
    setTimeout(() => {
      this.modalCtrl.dismiss();
    }, 2000);
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      duration: 2000,
      message: 'Заказ принят и находится в обработке',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}



