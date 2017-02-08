import { Component } from '@angular/core';
import { NavController, AlertController, ViewController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

/*
  Generated class for the Modal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
  // styles: ['.scroll-content { overflow-y: auto }']
})
export class Modal {
  storeNotificationsArray: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.getStorageItem();
  }

  ionViewDidLoad() {
    console.log('Hello Modal Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

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
