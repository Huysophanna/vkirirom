import { Component } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { NativeStorage } from 'ionic-native';
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
  @ViewChild(Slides) slides: Slides;
  sliderOptions: any;
 
  constructor(public navCtrl: NavController) {
 
    this.sliderOptions = {
      pager: true
    };
 
  }
 
  nextSlide() {
    this.slides.slideNext();
  }
 
  goToHome(){
    this.navCtrl.setRoot(Login, {}, {animate: true, direction: 'forward'});

    //set introShown to storage to indicates that the intro is already shown to the user
    NativeStorage.setItem("introShown", true);
  }
 

}
