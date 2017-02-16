import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Chatmessage } from '../pages/chatmessage/chatmessage';
import { Facebook } from 'ionic-native';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Introslides } from '../pages/introslides/introslides';
import { Membership } from '../pages/membership/membership';
import { Chat } from '../pages/chat/chat';
import { About } from '../pages/about/about';
import { Services } from '../pages/services/services';
import { Setting } from '../pages/setting/setting';
import { Signup } from '../pages/signup/signup';
import { Resetpw } from '../pages/resetpw/resetpw';
import { GoogleMapPage } from '../pages/map/map';
import { ContactModal } from '../pages/contact-modal/contact-modal';
import { Notificationpanel } from '../pages/notificationpanel/notificationpanel';
import { Editprofile } from '../pages/editprofile/editprofile';
import { Reservation } from '../pages/reservation/reservation';
import { Ipadintro } from '../pages/ipadintro/ipadintro';
import { AuthData } from '../providers/auth-data';
import { FirebaseUserData } from '../providers/firebase-user-data';
import { Api } from '../providers/api';
import { Storage } from '@ionic/storage';
import { LocationTracker } from '../providers/location-tracker';
import { SettingService } from '../providers/setting-service';
import { Userscope } from '../providers/userscope';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Dashboard,
    Membership,
    Chat,
    Chatmessage,
    About,
    GoogleMapPage,
    Services,
    Setting,
    Reservation,
    Signup,
    GoogleMapPage,
    Services,
    Resetpw,
    ContactModal,
    Notificationpanel,
    Editprofile,
    Introslides,
    Ipadintro
  ],
  imports: [
    IonicModule.forRoot(MyApp)
    // CloudModule.forRoot(CloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Dashboard,
    Membership,
    Chat,
    Chatmessage,
    About,
    GoogleMapPage,
    Services,
    Setting,
    Reservation,
    Signup,
    Resetpw,
    ContactModal,
    Notificationpanel,
    Editprofile,
    Introslides,
    Ipadintro
  ],
  providers: [
    AuthData,
    Facebook,
    Storage,
    LocationTracker,
    SettingService,
    Userscope,
    FirebaseUserData
  ]
})
export class AppModule {}
