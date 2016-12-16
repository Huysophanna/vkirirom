import { Component, ViewChild, Input } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar, Push, Facebook, NativeStorage, CallNumber } from 'ionic-native';
import { Api } from '../providers/api';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Chatmessage } from '../pages/chatmessage/chatmessage';
import { GoogleMapPage } from '../pages/map/map';
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

  constructor(platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      //push configuration
      let push = Push.init({
        android: {
          senderID: "82070365426"
        },
        ios: {
          alert: "true",
          badge: false,
          sound: "true"
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
            if (data.title == 'New message') {
              //alert notification for chat messages
              confirmAlert = this.alertCtrl.create({
                title: "New message",
                message: data.message,
                buttons: [{
                  text: 'Ignore',
                  role: 'cancel'
                }, {
                  text: 'View',
                  handler: () => {
                    //TODO: Your logic here
                    self.nav.push(Chatmessage, {message: data.message});
                  }
                }]
              });
            } else {
              confirmAlert = this.alertCtrl.create( {
                title: "Hi, " + this.userName,
                message: data.message,
                buttons: [{
                  text: 'Ignore',
                  role: 'cancel'
                }, {
                  text: 'View',
                  handler: () => {
                    //TODO: Your logic here
                    self.nav.push(Dashboard, {message: data.message});
                  }
                }]
              });
            }
            
            confirmAlert.present();
          } else {
            //if user NOT using app and push notification comes
            //TODO: Your logic on click of push notification directly
            if (data.title == 'New message') {
              self.nav.push(Chatmessage, {message: data.message});
            } else {
              self.nav.push(Dashboard, {message: data.message});
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
      NativeStorage.getItem('userID').then(data => {
        this.fbID = data;
        this.userPhoto = "https://graph.facebook.com/" + this.fbID + "/picture?width=320&height=320";
      });
      NativeStorage.getItem('userDetails')

        .then(
          data => {
            this.userName = data.displayName;
            this.userEmail = data.email;
          }
        );
    });

    // set our app's pages
    this.pages = [
      { title: 'Setting', id: 1, ionicon: 'ios-settings-outline'},
      { title: 'Contact Us', id: 2, ionicon: 'ios-call-outline'},
      { title: 'Log Out', id: 3, ionicon: 'ios-exit-outline'}
    ];

    //  //Push notification configuration
    //   this.push.register().then((t: PushToken) => {
    //       return this.push.saveToken(t);
    //   }).then((t: PushToken) => {
    //       console.log('Token saved:', t.token);
    //   });
    //   this.push.rx.notification().subscribe((msg) => {
    //     this.pushNotifications = msg.text;
    //     this.pushNotificationTitle = msg.title;
    //     alert(this.pushNotifications + ': ' + this.pushNotificationTitle);
    //   });
      
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
