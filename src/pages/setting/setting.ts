import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

declare var cordova: any;

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {
  public location:any = [];
  public notification:any = [];
  public loc: any;
  public noti: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private storage: Storage) {}

  ionViewWillEnter() {
    this.locationData();
    this.notificationData();
  }

  locationData() {
    this.storage.get('location').then((val) => {
      var parseData = JSON.parse(val);
      this.loc = parseData[parseData.length - 1];
      this.turnLoc(this.loc);
    });
  }

  notificationData() {
    this.storage.get('notification').then((val) => {
      var parseData = JSON.parse(val);
      this.noti = parseData[parseData.length - 1];
      this.turnNoti(this.noti);
    });
  }

  turnLoc(location) {
    if (location == true) {
      cordova.plugins.backgroundMode.enable();
    } else {
      cordova.plugins.backgroundMode.disable();
    }
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
    this.storage.set('location', JSON.stringify(this.location));
  }

  setNotification(data) {
    this.notification.push(data);
    this.storage.set('notification', JSON.stringify(this.notification));
  }

}
