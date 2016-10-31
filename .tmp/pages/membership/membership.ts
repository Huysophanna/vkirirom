import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  point: any;

  constructor(public navCtrl: NavController) {}

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
