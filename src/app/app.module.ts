import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Chatmessage } from '../pages/chatmessage/chatmessage';
import { Facebook } from 'ionic-native';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Category } from '../pages/category/category';
import { Membership } from '../pages/membership/membership';
import { Chat } from '../pages/chat/chat';
import { About } from '../pages/about/about';
import { GoogleMapPage } from '../pages/map/map';
import { AuthData } from '../providers/auth-data';
import { Api } from '../providers/api';
import { Storage } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyDorWd2MGbJbVjHiKvL3jo2F1qe31A6R08",
  authDomain: "vkirirom-809f8.firebaseapp.com",
  databaseURL: "https://vkirirom-809f8.firebaseio.com",
  storageBucket: "vkirirom-809f8.appspot.com",
  messagingSenderId: "82070365426"
}

const CloudSettings: CloudSettings = {
  'core': {
    'app_id': '89423043'
  },
  'push': {
    'sender_id': '82070365426',
    'pluginConfig': {
      'ios': {
        'alert': true,
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    Login,
    Dashboard,
    Category,
    Membership,
    Chat,
    Chatmessage,
    About,
    GoogleMapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(CloudSettings),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Dashboard,
    Category,
    Membership,
    Chat,
    Chatmessage,
    About,
    GoogleMapPage
  ],
  providers: [
    AuthData,
    Facebook,
    Storage
  ]
})
export class AppModule {}
