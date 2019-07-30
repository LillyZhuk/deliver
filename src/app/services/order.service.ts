import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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
    return this.db.collection('orders').add({
      addition: {
        cheese: order.addition.cheese,
        mushrooms: order.addition.mushrooms
      },
      cafe: order.cafe,
      filling: order.filling,
      note: order.note,
      order: order.order,
      quantity: order.quantity,
      size: order.size,
      status: false
    });
  }
}

