import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import firebase from 'firebase';

/*
  Generated class for the Membership page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-membership',
  templateUrl: 'membership.html'
})
export class Membership {

  userPoint: number; userName: any; userPhoto: any; userID; userCardType: any; 
  userCardExpire: any; profilePicture: any; userData: any; 

  constructor(public navCtrl: NavController) {
    NativeStorage.getItem('userDetails')
      .then(
        data => {
          this.userName = data.displayName;
          this.userPhoto = data.photoURL;
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

  ionViewDidLoad() {
    console.log('Hello Membership Page');
  }

  pointSys() {
    if (this.userPoint == 0) {
      console.log("Out of vPoint!!!!!");
    } else {
      console.log("Point is here!!!!");
    }
  }

}
