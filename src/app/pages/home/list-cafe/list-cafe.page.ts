import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cafe',
  templateUrl: './list-cafe.page.html',
  styleUrls: ['./list-cafe.page.scss'],
})
export class ListCafePage implements OnInit {

  public cafe = [
    {
      cafe: 'Best Grill',
      id: 1
    },
    {
      cafe: 'Sushi 3303',
      id: 2
    },
    {
      cafe: 'Ambar',
      id: 3
    },
    {
      cafe: 'McDonalds',
      id: 4
    },
    {
      cafe: 'Rock-n-Roll',
      id: 5
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
