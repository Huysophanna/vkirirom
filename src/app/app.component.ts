import { Component, ViewChild, Input, NgZone } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController, NavController, Events } from 'ionic-angular';
import { StatusBar, Push, Facebook, NativeStorage, CallNumber, Keyboard } from 'ionic-native';
import { Api } from '../providers/api';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Chatmessage } from '../pages/chatmessage/chatmessage';
import { GoogleMapPage } from '../pages/map/map';
import { Signup } from '../pages/signup/signup';
import { AuthData } from '../providers/auth-data';

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
  userName: any;
  userPhoto: any;
  userEmail: any;
  fbID: any;

  constructor(platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public events: Events, public ngzone: NgZone) {
    platform.ready().then(() => {
      this.getStorageItem();
      //push configuration
      let push = Push.init({
        android: {
          senderID: "82070365426"
        },
        ios: {
          alert: 'true',
          badge: 'true',
          sound: 'true',
          senderID: "82070365426",
          gcmSandbox:"true"
        },
        windows: {}
      });


        push.on('registration', (data) => {
          NativeStorage.setItem('deviceToken', data.registrationId);
          //TODO - send device token to server
        });
        push.on('notification', (data) => {
          let self = this;
          let confirmAlert: any;
          //if user using app and push notification comes
          if (data.additionalData.foreground) {
            // if application open on foreground, show popup
            if (data.title.indexOf('New message') >= 0) {
              //alert notification for chat messages
              
              confirmAlert = this.alertCtrl.create({
                title: data.title,
                message: data.message,
                buttons: [{
                  text: 'Ignore',
                  role: 'cancel'
                }, {
                  text: 'View',
                  handler: () => {
                    self.nav.push(Chatmessage, {message: data.message});
                  }
                }]
              });
            } else {
              // this.events.publish('foreground-marketing-notification', data.message);
              confirmAlert = this.alertCtrl.create( {
                title: "Hi, " + this.userName,
                message: data.message,
                buttons: [{
                  text: 'Okay',
                  role: 'cancel'
                }]
              });
            }
            
            confirmAlert.present();
          } else {
            //if user NOT using app and push notification comes
            //TODO: Your logic on click of push notification directly
            if (data.title.indexOf('New message') >= 0) {
              self.nav.push(Chatmessage, {message: data.message});
            }
          }

        });
        push.on('error', (e) => {
          console.log(e.message);
          alert(e.message);
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
        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        if (!user) {
          this.loading.present();
          this.loading.dismiss();
          this.rootPage = Login;
        }
      });
      StatusBar.styleDefault();

      //listen for events
      this.events.subscribe("UserLogin", name => {
         this.getStorageItem();
      });

    });

    // set our app's pages
    this.pages = [
      { title: 'Setting', id: 1, ionicon: 'ios-settings-outline'},
      { title: 'Contact Us', id: 2, ionicon: 'ios-call-outline'},
      { title: 'Log Out', id: 3, ionicon: 'ios-exit-outline'}
    ];
      
  }

  getStorageItem() {
      NativeStorage.getItem('userPhoto').then(data => {
          this.userPhoto = data;
      });
      NativeStorage.getItem('userDetails').then(data => {
          this.userName = data.displayName;
          this.userEmail = data.email;
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    //logout function
    switch (page.id) {
      case 2:
        CallNumber.callNumber("0962304669", true);
      break;
      case 3:
        //store userProfile object to the phone storage
        Facebook.logout();
        NativeStorage.setItem('userDetails', "");
        this.nav.setRoot(Login);
        console.log(page.title);
      break;
    }
  }

  openHome(){
    //this.nav.setRoot(Page1);
    this.isHome = false;
  }
}
