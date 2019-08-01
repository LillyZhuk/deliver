import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { OrderService } from '../../../services/order.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  isLoaded = false;
  userRole: string;
  public history = [];
  public mockedAdmin = [];
  private updateData;

  constructor(
      private storage: Storage,
      private orderService: OrderService
  ) {}

  ngOnInit() {
    this.storage.get('role').then(val => {
      if (val === 'admin') {
        this.userRole = val;
        this.getOrders();
      }
      if (val === 'user') {
        this.userRole = val;
        this.getHistory();
      }
    });
  }

  public getHistory() {
    this.storage.get('uid').then(val => {
      this.orderService.getHistory(val).subscribe(
          querySnapshot => {
            querySnapshot.forEach(items => {
              console.log(items.data(), items, 'history page');
              this.history.push(items.data());
            });
          });
      this.history.forEach(item => {
              if (item.addition.mushrooms) {
                item.mushrooms = ', с грибами';
              }
              if (item.addition.cheese) {
                item.cheese = ', с сыром';
              }
            });
    });
  }

  getOrders() {
      this.orderService.getOrders().subscribe(
          querySnapshot => {
            querySnapshot.forEach(items => {
              this.mockedAdmin.push(items.data());
            });
       });
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
    this.orderService.updateOrder(value);
    this.getOrders();
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
