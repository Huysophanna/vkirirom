import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { AuthData } from '../providers/auth-data';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Dashboard
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Dashboard
  ],
  providers: [
    AuthData
  ]
})
export class AppModule {}
