import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './component/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { HomePageModule } from './pages/home/home.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from './core/config';

import { IonicStorageModule } from '@ionic/storage';
import { AuthGuard } from './services/auth.guard';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { CoreModule } from './component/core.module';
import { ChatService } from './services/chat.service';
import { ProfileService } from './services/profile.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AuthModule,
    HomePageModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    NativeStorage,
    ChatService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
