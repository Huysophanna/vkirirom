import { Component } from '@angular/core';
import { NavController, Slides, Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { NativeStorage } from 'ionic-native';
import { Login } from '../login/login';

@Component({
  selector: 'page-introslides',
  templateUrl: 'introslides.html'
})

export class Introslides {
  isIpad: any;
  @ViewChild(Slides) slides: Slides;
  sliderOptions: any;
 
  constructor(public navCtrl: NavController, public platform: Platform) {
    if (this.platform.width() > 700) {
      this.isIpad = true;
    } else {
      this.isIpad = false;
    }
 
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
