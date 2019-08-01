import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListCafePage } from './list-cafe.page';
import { MenuPage } from './menu/menu.page';
import { IonicStorageModule } from '@ionic/storage';

// import { ModalPage } from './modal/modal.page';

const routes: Routes = [
  {
    path: '',
    component: ListCafePage
  },
  {
    path: 'list-cafe/:cafeId',
    component: MenuPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicStorageModule.forRoot()
  ],
  declarations: [ListCafePage, MenuPage],
  // entryComponents: [ModalPage],

})
export class ListCafePageModule {}
