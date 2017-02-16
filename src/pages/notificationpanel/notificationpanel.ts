import { Component, NgZone } from '@angular/core';
import { Events, NavController, AlertController, ViewController } from 'ionic-angular';
import { Toast, NativeStorage } from 'ionic-native';

@Component({
  selector: 'page-notificationpanel',
  templateUrl: 'notificationpanel.html'
  // styles: ['.scroll-content { overflow-y: auto }']
})
export class Notificationpanel {
  storeNotificationsArray: any = [];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController, public events: Events, public ngZone: NgZone) {
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

  clearNotification() {
    if (this.storeNotificationsArray != []) {
      this.makeToast('Success! Notifications are cleared');
    } else {
      this.makeToast('No Notifications to be cleared');
    }
    this.ngZone.run(() => {
      this.storeNotificationsArray = [];
    });
    this.events.publish('clearNotification');
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

  makeToast(message) {
    Toast.show(message, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
    );
  }

}
