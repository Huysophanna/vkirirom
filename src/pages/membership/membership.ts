import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';


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

  constructor(public navCtrl: NavController) {
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
