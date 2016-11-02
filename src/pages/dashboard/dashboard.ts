import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from 'ionic-native';
import { Toast } from 'ionic-native';

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

  sos() {
    SMS.send('+855962304669', 'Hello World')
      .then(()=> {
        Toast.show("Success", '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }, ()=> {
        Toast.show("Error", '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    console.log("SOS is calling ");
  }

  ionViewDidLoad() {
    console.log('Hello Dashboard Page');
  }

}
