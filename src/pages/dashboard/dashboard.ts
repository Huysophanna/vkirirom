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
    var options={
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
              //  intent: 'INTENT'  // Opens Default sms app
              intent: '' // Sends sms without opening default sms app
            }
    }
    SMS.send('+855962304669', 'https://www.google.com/maps/dir/Current+Location/', options)
      .then(()=> {
        alert("success");
        Toast.show("Success", '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }, ()=> {
        alert("Error");
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
