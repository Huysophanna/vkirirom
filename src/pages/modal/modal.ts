import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the Modal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class Modal {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello Modal Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
