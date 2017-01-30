import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import firebase from 'firebase';

@Component({
  selector: 'page-membership',
  templateUrl: 'membership.html'
})
export class Membership {
  userProfile: any;
  userPoint: number; userName: any; userPhoto: any; userID: any; userCardType: any; 
  userCardExpire: any; profilePicture: any; userData: any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

    NativeStorage.getItem('userPhoto').then(data => {
      this.userPhoto = data;
    });
    NativeStorage.getItem('userDetails')
      .then(
        data => {
          this.userName = data.displayName;
          //get the user data from firebase database
          this.userData = firebase.database().ref('Users/' + data.uid).once('value').then(data => {
            this.userID = data.child('cardid').val();
            this.userPoint = data.child('vpoint').val();
            this.userCardType = data.child('type').val();
            this.userCardExpire = data.child('expire').val();
          });
        },
        error => console.error(error)
    );

  }

  pointSys() {
    if (this.userPoint == 0) {
      console.log("Out of vPoint!!!!!");
    } else {
      console.log("Point is here!!!!");
    }
  }

  warningAlert(title, message) {
    this.alertCtrl.create( {
        title: title,
        message: message,
        buttons: [{
          text: 'Back',
          handler: data => {
            this.navCtrl.pop();
          }
        }]
    }).present();
  }

}
