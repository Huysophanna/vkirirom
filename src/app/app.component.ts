import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Api } from '../providers/api';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Category } from '../pages/category/category';
import { AuthData } from '../providers/auth-data';


@Component({
  templateUrl: 'app.html',
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = Dashboard;
  isHome: boolean = false;
  pages: any = []
  authData: any = AuthData; 
  loading: any;

  constructor(platform: Platform, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    // set our app's pages
    this.pages = [
      { title: 'Setting', component: Dashboard},
      { title: 'About', component: Dashboard},
      { title: 'Contact Us', component: Dashboard},
      { title: 'Log Out', id: 4}
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
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    //logout function
    if (page.id == 4) { 
      this.nav.setRoot(Login);
      console.log(page.title);
    }
  }

  openHome(){
    //this.nav.setRoot(Page1);
    this.isHome = false;
  }


}
