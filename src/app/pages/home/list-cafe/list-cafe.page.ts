import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { Cafes } from '../../../component/models/cafes';

@Component({
  selector: 'app-list-cafe',
  templateUrl: './list-cafe.page.html',
  styleUrls: ['./list-cafe.page.scss'],
})
export class ListCafePage implements OnInit, OnDestroy {

  public cafe: Cafes[] = [];
  private listCafeSub: Subscription;

  constructor(
      private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getListCafe();
  }

  public getListCafe() {
    this.listCafeSub = this.orderService.getListCafe().subscribe(
        (querySnapshot: firebase.firestore.QuerySnapshot) => {
      querySnapshot.forEach(item => {
        this.cafe.push(item.data() as Cafes);
      });
    });
  }

  ngOnDestroy() {
    this.listCafeSub.unsubscribe();
  }

}
