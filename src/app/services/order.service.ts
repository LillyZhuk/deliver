import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { Order } from '../component/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
      private http: HttpClient,
      private storage: Storage,
      private afAuth: AngularFireAuth,
      private db: AngularFirestore,
  ) { }

  public createOrder(order: Order) {
    return this.db.collection('orders').doc(`${order.id}`).set({
      addition: {
        cheese: order.addition.cheese,
        mushrooms: order.addition.mushrooms
      },
      id: order.id,
      cafe: order.cafe,
      filling: order.filling,
      note: order.note,
      order: order.order,
      quantity: order.quantity,
      size: order.size,
      status: false,
      name: order.name,
      userId: order.userId,
      date: new Date().getTime(),
    });
  }

  public getHistory(uid) {
    console.log(uid, 'profile service');
    return this.db.collection('orders', ref => ref.where('userId', '==', uid)).get();
  }

  public getOrders() {
    return this.db.collection('orders').get();
  }

  public getListCafe() {
    return this.db.collection('listcafe').get();
  }

  public getMenu() {
    return this.db.collection(`menu`).get();
  }

  public updateOrder(id) {
    return this.db.collection('orders').doc(`${id}`).update({
      status: true
    });
  }

}

