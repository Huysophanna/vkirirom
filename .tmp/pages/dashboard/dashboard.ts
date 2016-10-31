import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Membership } from '../membership/membership';

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {

  membership = Membership;

  constructor(public navCtrl: NavController) {}

  navigate() {
    console.log("function is calling");
    this.navCtrl.push(Membership);
  }

  ionViewDidLoad() {
    console.log('Hello Dashboard Page');
  }

}
