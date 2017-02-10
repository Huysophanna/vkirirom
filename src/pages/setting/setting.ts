import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { SettingService } from '../../providers/setting-service';
import { FirebaseUserData } from '../../providers/firebase-user-data';
import firebase from 'firebase';

declare var cordova: any;
declare var io: any;

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {
  public location:any = [];
  public notification:any = [];
  public loc: any;
  public noti: any;
  public socket: any;
  public token: any;
  public locationTag: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public settingService: SettingService, private firebaseUserData: FirebaseUserData, private platform: Platform) {

    platform.ready().then(() => {
      NativeStorage.getItem('bgLocationTag').then(val => {
        this.loc = val;
      });

    });

    this.locationData();
    this.notificationData();
  }

  locationData() {
    NativeStorage.getItem('location').then(data => {
      var parseData = JSON.parse(data);
      this.loc = parseData[parseData.length - 1];
    }, err => {
      console.log("NativeStorage error " + err);
    });
  }

  notificationData() {
    NativeStorage.getItem('notification').then(data => {
      var parseData = JSON.parse(data);
      this.noti = parseData[parseData.length - 1];
      this.turnNoti(this.noti);
    }, err => {
      console.log("NativeStorage error " + err);
    });
  }

  turnLoc(location) {
    if (location == true) {
      cordova.plugins.backgroundMode.enable();
      // this.data.bgLocationTag = true;
    } else {
      cordova.plugins.backgroundMode.disable();
      // this.data.bgLocationTag = false;
    }
    //emit user data to server
    // this.socket.emit('backgroundLocation', (this.data));
  }

  turnNoti(notification) {
    if (notification == true) {
      console.log("Turn on the notification");
    } else {
      console.log("Turn off the notification");
    }
  }

  setLocation(data) {
    this.location.push(data);

    //update bgLocationTag to firebase using provider
    this.firebaseUserData.updateBgLocationTag(data);

    // this.data.locationTag = data;
    // this.socket.emit('backgroundLocation', (this.data));

    // NativeStorage.setItem('location', JSON.stringify(this.location)).then(() => {
    //   console.log("Stored Item");
    // }, error => {
    //   console.log("NativeStorage error");
    // });
  }

  setNotification(data) {
    this.notification.push(data);
    NativeStorage.setItem('notification', JSON.stringify(this.notification)).then(() => {
      console.log("Stored Item");
    }, error => {
      console.log("NativeStorage error!" + error);
    });
  }

}
