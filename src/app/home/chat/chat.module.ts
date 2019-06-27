import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';
import { DialogComponent } from './dialog/dialog.component';
import {IonicPageModule} from 'ionic-angular';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  },
  {
    path: 'chat/:id',
    component: DialogComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicPageModule
  ],
  declarations: [ChatPage, DialogComponent]
})
export class ChatPageModule {}
