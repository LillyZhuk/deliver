import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ChatPageModule } from './chat/chat.module';
import { ListCafePageModule } from './list-cafe/list-cafe.module';

import { HomePageRoutingModule } from './home.router.module';

import { ChatService } from '../../services/chat.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ChatPageModule,
    ListCafePageModule
  ],
  declarations: [HomePage],
  // providers: [ChatService]
})
export class HomePageModule {}
