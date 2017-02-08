import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the ContactModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact-modal',
  templateUrl: 'contact-modal.html'
})
export class ContactModal {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello ContactModal Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
