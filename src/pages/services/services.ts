import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';

/*
  Generated class for the Services page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class Services {
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker) {
  }

  ionViewDidLoad() {
    console.log('Hello Services Page');
  }

}
