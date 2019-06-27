import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ChatPageModule } from './chat/chat.module';

import { HomePageRoutingModule } from './home.router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ChatPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
