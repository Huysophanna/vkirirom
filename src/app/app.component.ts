import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  public rootPage: any = Dashboard;


  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    }); 

    //firebase configuration
    firebase.initializeApp({
      apiKey: "AIzaSyDorWd2MGbJbVjHiKvL3jo2F1qe31A6R08",
      authDomain: "vkirirom-809f8.firebaseapp.com",
      databaseURL: "https://vkirirom-809f8.firebaseio.com",
      storageBucket: "vkirirom-809f8.appspot.com",
      messagingSenderId: "82070365426"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = Login;
      }
    });
  }
}
