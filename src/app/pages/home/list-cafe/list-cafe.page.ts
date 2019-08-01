import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-list-cafe',
  templateUrl: './list-cafe.page.html',
  styleUrls: ['./list-cafe.page.scss'],
})
export class ListCafePage implements OnInit {

  public cafe = [];

  constructor(
      private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getListCafe();
  }

  public getListCafe() {
    this.orderService.getListCafe().subscribe(
    querySnapshot => {
      querySnapshot.forEach(item => {
        this.cafe.push(item.data());
      });
    });
  }

}
