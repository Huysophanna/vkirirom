import { Component } from '@angular/core';
import { Events, NavController, AlertController, ViewController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

/*
  Generated class for the Notificationpanel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notificationpanel',
  templateUrl: 'notificationpanel.html'
  // styles: ['.scroll-content { overflow-y: auto }']
})
export class Notificationpanel {
  storeNotificationsArray: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController, public events: Events) {
    this.getStorageItem();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // deleteItem(notiIndex) {
  //   this.storeNotificationsArray.splice(notiIndex, 1);
  //   this.events.publish('deleteNotification', this.storeNotificationsArray);
  //   // NativeStorage.setItem('storeNotificationsArray', this.storeNotificationsArray);
  //   // this.getStorageItem();
  // }

  viewBtnPressed(notiIndex) {
    let notiTitle;
    if (notiIndex.title == "New message") {
      notiTitle = "Chat Message";
    } else {
      notiTitle = notiIndex.title;
    }
    this.warningAlert(notiTitle, notiIndex.message);
  }

  getStorageItem() {
      NativeStorage.getItem('storeNotificationsArray').then(notifications => {
          this.storeNotificationsArray = notifications;
      });
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
