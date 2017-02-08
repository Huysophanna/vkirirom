import { Component } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Login } from '../login/login';

/*
  Generated class for the Introslides page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-introslides',
  templateUrl: 'introslides.html'
})

export class Introslides {
  sliderOptions: any;
 
  constructor(public navCtrl: NavController) {
 
    this.sliderOptions = {
      pager: true
    };
 
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }
 
  goToHome(){
    this.navCtrl.setRoot(Login);
  }
 

}
