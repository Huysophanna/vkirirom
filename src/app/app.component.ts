import { Component, ViewChild, Input } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Facebook, NativeStorage } from 'ionic-native';
import { Api } from '../providers/api';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { GoogleMapPage } from '../pages/map/map';
import { Category } from '../pages/category/category';
import { AuthData } from '../providers/auth-data';
import { Push, PushToken } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = Dashboard;
  isHome: boolean = false;
  pages: any = []
  authData: any = AuthData; 
  loading: any;
  pushNotifications: any;
  pushNotificationTitle: any;
  userName: any;
  userPhoto: any;
  userEmail: any;

  constructor(platform: Platform, public loadingCtrl: LoadingController, public push: Push) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      NativeStorage.getItem('userDetails')
        .then(
          data => {
            this.userName = data.displayName;
            this.userPhoto = data.photoURL;
            this.userEmail = data.email;
          },
          error => console.error(error)
        );
    });

    // set our app's pages
    this.pages = [
      { title: 'Setting', component: Dashboard, ionicon: 'ios-settings-outline'},
      { title: 'Contact Us', component: Dashboard, ionicon: 'ios-call-outline'},
      { title: 'Log Out', id: 4, ionicon: 'ios-exit-outline'}
    ];

    //firebase configuration
    firebase.initializeApp({
      apiKey: "AIzaSyDorWd2MGbJbVjHiKvL3jo2F1qe31A6R08",
      authDomain: "vkirirom-809f8.firebaseapp.com",
      databaseURL: "https://vkirirom-809f8.firebaseio.com",
      storageBucket: "vkirirom-809f8.appspot.com",
      messagingSenderId: "82070365426"
    });
    firebase.auth().onAuthStateChanged((user) => {
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      if (!user) {
        this.loading.present();
        this.loading.dismiss();
        this.rootPage = Login;
      }
    });

     //Push notification configuration
      this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
      }).then((t: PushToken) => {
          console.log('Token saved:', t.token);
      });
      this.push.rx.notification().subscribe((msg) => {
        this.pushNotifications = msg.text;
        this.pushNotificationTitle = msg.title;
        alert(this.pushNotifications + ': ' + this.pushNotificationTitle);
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    //logout function
    if (page.id == 4) {
      //store userProfile object to the phone storage
      Facebook.logout();
      NativeStorage.setItem('userDetails', "");
      this.nav.setRoot(Login);
      console.log(page.title);
    }
  }

  openHome(){
    //this.nav.setRoot(Page1);
    this.isHome = false;
  }
}
