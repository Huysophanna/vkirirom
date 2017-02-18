import { Component } from '@angular/core';
import { NavController, Slides, NavParams, Platform, ViewController } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'page-service-detail',
  templateUrl: 'service-detail.html'
})
export class ServiceDetail {
  imageURL: any;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController) {
    platform.ready().then(() => {
      this.imageURL = navParams.get("imageURL");
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('Hello ServiceDetail Page');
  }

}
