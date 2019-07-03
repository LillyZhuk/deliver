import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';

import {DialogPage} from './dialog/dialog.page';
import {CoreModule} from '../../../component/core.module';
// import {DialogPageModule} from './dialog/dialog.module';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  },
  {
    path: 'chat/:id',
    component: DialogPage
  },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        CoreModule,
        // DialogPageModule
    ],
  declarations: [ChatPage, DialogPage]
})
export class ChatPageModule {}
