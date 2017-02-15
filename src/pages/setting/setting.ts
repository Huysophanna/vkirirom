import { Component } from '@angular/core';
import { ViewController, Platform, NavController, AlertController, Events } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public settingService: SettingService, private firebaseUserData: FirebaseUserData, private platform: Platform, public viewCtrl: ViewController, public events: Events) {

  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      NativeStorage.getItem('settingToggleNotification').then(_val => {
        this.noti = _val;
      });
    });
    alert(this.noti);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setNotification(data) {
    //emit events to turn off alert push notification
    this.events.publish("settingToggleNotification", data);
  }

}
