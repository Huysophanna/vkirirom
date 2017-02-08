import { Component, ViewChild, Input, NgZone } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController, NavController, Events, ActionSheetController } from 'ionic-angular';
import { StatusBar, Facebook, NativeStorage, CallNumber, Keyboard, Geolocation, BackgroundGeolocation, Geoposition, BackgroundMode, Push } from 'ionic-native';
import { Api } from '../providers/api';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Setting } from '../pages/setting/setting';
import { Chatmessage } from '../pages/chatmessage/chatmessage';
import { GoogleMapPage } from '../pages/map/map';
import { Signup } from '../pages/signup/signup';
import { Resetpw } from '../pages/resetpw/resetpw';
import { AuthData } from '../providers/auth-data';

declare var cordova: any;

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
  pushNotifications: any;
  pushNotificationTitle: any;
  storeNotificationsArray: any = [];

  constructor(platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public events: Events, public ngzone: NgZone, public actionsheetController: ActionSheetController) {
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
          //store all notifications to local storage for the notification panel
          this.storeNotificationsArray.push(data);
          NativeStorage.setItem('storeNotificationsArray', this.storeNotificationsArray);

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
              }).present();
            } else {
              // this.events.publish('foreground-marketing-notification', data.message);
              let title = "Hi, " + this.userName;
              this.warningAlert(title, data.message);
            }
          } else {
            //if user NOT using app and push notification comes
            if (data.title.indexOf('New message') >= 0) {
              self.nav.push(Chatmessage, {message: data.message});
            }
          }

        });
        push.on('error', (e) => {
          console.log(e.message);
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
        this.ngzone.run(() => {
          this.userPhoto = data;
        }); 
          
      });
      NativeStorage.getItem('userDetails').then(data => {
        this.ngzone.run(() => {
          this.userName = data.displayName;
          this.userEmail = data.email;
        }); 
      });
      NativeStorage.getItem('storeNotificationsArray').then(notifications => {
          this.storeNotificationsArray = notifications;
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    //logout function
    switch (page.id) {
      case 1:
       this.nav.push(Setting);
       break;
      case 2:
        let actionSheet = this.actionsheetController.create({
          title: 'Contact',
            buttons: [
              {
                text: 'Room Reservation',
                handler: () => {
                  console.log('Reservation clicked');
                  CallNumber.callNumber("0962304669", true);
                }
              },{
                text: 'Security & Safety',
                handler: () => {
                  console.log('Security clicked');
                  CallNumber.callNumber("0962304669", true);
                }
              },{
                text: 'Regular Shuttle Bus',
                handler: () => {
                  console.log('Suttle Bus clicked');
                  CallNumber.callNumber("0962304669", true);
                }
              },{
                text: 'Restaurant',
                handler: () => {
                  console.log('Restaurant clicked');
                  CallNumber.callNumber("0962304669", true);
                }
              },{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log("cancel clicked");
                }
              }
            ]
        });
        actionSheet.present();
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

  warningAlert(title, message) {
    this.alertCtrl.create( {
        title: title,
        message: message,
        buttons: [{
          text: 'Okay',
          role: 'cancel'
        }]
    }).present();
  }


}
