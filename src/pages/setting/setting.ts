import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { SettingService } from '../../providers/setting-service';

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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public settingService: SettingService) {
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
    NativeStorage.setItem('location', JSON.stringify(this.location)).then(() => {
      console.log("Stored Item");
    }, error => {
      console.log("NativeStorage error");
    });
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
