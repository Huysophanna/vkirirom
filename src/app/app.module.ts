import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Facebook } from 'ionic-native';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Category } from '../pages/category/category';
import { Membership } from '../pages/membership/membership';
import { Chat } from '../pages/chat/chat';
import { AuthData } from '../providers/auth-data';
import { Api } from '../providers/api';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Dashboard,
    Category,
    Membership,
    Chat
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Dashboard,
    Category,
    Membership,
    Chat
  ],
  providers: [
    AuthData,
    Facebook,
    Storage
  ]
})
export class AppModule {}
