import { NgZone, Component } from '@angular/core';
import { NavParams, ViewController, Platform, NavController, AlertController, Events } from 'ionic-angular';
import { NativeStorage, LocationAccuracy, Diagnostic } from 'ionic-native';
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
  public loc: any;
  public notiToggle: any;
  public locToggle: any;
  public socket: any;
  public token: any;
  public locationTag: any;
  public notification: any;
  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public settingService: SettingService, private firebaseUserData: FirebaseUserData, private platform: Platform, public viewCtrl: ViewController, public events: Events, public navParams: NavParams, public ngZone: NgZone) {
    platform.ready().then(() => {
      this.notiToggle = this.navParams.get("settingToggleNotification");
      this.locToggle = "ON";
    });
  }

  clickHelp() {
    this.warningAlert('Help', 'Notification: Turn OFF/ON all incoming alert notification including Digital News Content as well as Chat Messaging.');
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  setNotification() {
    // //emit events to turn off alert push notification
    // this.events.publish("settingToggleNotification", data);
    // // alert(data);

    this.alertCtrl.create({
        title: 'Notification',
        message: 'Notifications includes Digital News Content, also Group Chat alert. Turn OFF to avoid push notifications.',
        buttons: [
          {
            text: 'Turn OFF',
            handler: () => {
              this.ngZone.run(() => {
                this.notiToggle = "OFF";
              });
              //emit events to turn off alert push notification
              this.events.publish("settingToggleNotification", this.notiToggle);
            }
          },
          {
            text: 'Turn ON',
            handler: () => {
                this.notiToggle = "ON";
              //emit events to turn off alert push notification
              this.events.publish("settingToggleNotification", this.notiToggle);
            }
          }
        ]
      }).present();
    


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
