import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Facebook } from 'ionic-native';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Category } from '../pages/category/category';
import { AuthData } from '../providers/auth-data';
import { Api } from '../providers/api';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Dashboard,
    Category
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Dashboard,
    Category
  ],
  providers: [
    AuthData,
    Facebook
  ]
})
export class AppModule {}
