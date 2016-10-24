import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Api } from '../providers/api';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Category } from '../pages/category/category';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = Dashboard;
  isHome: boolean = false;
  pages: any = []

  constructor(platform: Platform, private api: Api) {
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

    api.category().then(datas => {
      for(let i of datas){
        this.pages.push({
          title: i.name,
          id: i.id
        });
      }
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(Category, {
      id: page.id,
      title: page.title
    });
    this.isHome = true;
  }

  openHome(){
    //this.nav.setRoot(Page1);
    this.isHome = false;
  }


}
