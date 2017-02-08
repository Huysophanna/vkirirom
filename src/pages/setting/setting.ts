import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { SettingService } from '../../providers/setting-service';

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
  public username: any;
  public token: any;
  public locationTag: any;
  public data = {
        username: "",
        token: "",
        locationTag: false
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public settingService: SettingService) {
    this.socket = io.connect('http://110.74.203.152:3000');
    this.socket.on('backgroundLocation', (data) => {

    });

    this.getItemStorage();
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
      this.data.locationTag = true;
    } else {
      cordova.plugins.backgroundMode.disable();
      this.data.locationTag = false;
    }
    //emit user data to server
    this.socket.emit('backgroundLocation', (this.data));
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

    //emit user data to server
    this.data.locationTag = data;
    this.socket.emit('backgroundLocation', (this.data));

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

  getItemStorage() {
    NativeStorage.getItem('userDetails')
          .then(
            data => {
              this.data.username = data.displayName;
            },
            error => console.error(error)
        );

        NativeStorage.getItem('deviceToken')
          .then(
            data => {
              this.data.token = data;
            },
            error => console.error(error)
        );
  }

}
