import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from 'ionic-native';
import { Toast } from 'ionic-native';

import { Membership } from '../membership/membership';

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

<<<<<<< HEAD
  sos() {
    SMS.send('+855962304669', 'Hello World')
      .then(()=> {
        alert('success');
      }, ()=> {
        Toast.show("I'm a toast", '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    console.log("SOS is calling ");
  }

=======
>>>>>>> 024f66d27359556a77894acce16268b0584dbd85
  ionViewDidLoad() {
    console.log('Hello Dashboard Page');
  }

}
