import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListCafePage } from './list-cafe.page';
import { MenuPage } from './menu/menu.page';

const routes: Routes = [
  {
    path: '',
    component: ListCafePage
  },
  {
    path: 'list-cafe/:id',
    component: MenuPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListCafePage, MenuPage]
})
export class ListCafePageModule {}
