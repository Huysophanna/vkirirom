import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


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

  point: number;
  userName: any;
  userPhoto: any;
  profilePicture: any;
  users: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private angFire: AngularFire) {
    this.users = angFire.database.list('/Users');
    NativeStorage.getItem('userDetails')
      .then(
        data => {
          this.userName = data.displayName;
          this.userPhoto = data.photoURL;
        },
        error => console.error(error)
      );
  }

  ionViewDidLoad() {
    console.log('Hello Membership Page');
  }

  pointSys() {
    if (this.point == 0) {
      console.log("Out of vPoint!!!!!");
    } else {
      console.log("Point is here!!!!");
    }
  }

}
