import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Order } from '../../../../component/models/order';
import {OrderService} from '../../../../services/order.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  public form: FormGroup;
  public img = '../../../../assets/shapes.svg';
  public data = null;
  public id: number;
  public cafe = [
    { cafe: 'Best Grill', id: 1 },
    { cafe: 'Sushi 3303', id: 2 },
    { cafe: 'Ambar', id: 3 },
    { cafe: 'McDonalds', id: 4 },
    { cafe: 'Rock-n-Roll', id: 5 }
  ];
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
      private orderService: OrderService
  ) { }

  ngOnInit() {
    this.data = this.navParams.get('menu');
    this.id = this.navParams.get('cafeId');
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
    const cafeName = this.cafe.filter(value => value.id === this.id);
    this.order.cafe = cafeName[0].cafe;
    this.order.filling = this.filling;
    this.order.order = this.data.title;
    this.order.addition = this.addition;
    this.order.quantity = form.value.quantity;
    this.order.size = this.size;
    this.order.note = form.value.note;
    console.log(this.order, form.value, 'send');
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



