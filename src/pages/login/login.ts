import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  private user = {}

  constructor(public navCtrl: NavController) {
   
  }

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  loginForm() {
    console.log(this.user);
    this.navCtrl.setRoot(Dashboard);

  }

}
