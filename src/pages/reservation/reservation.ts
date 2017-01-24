import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';

declare var  $widget : any;
/*
  Generated class for the Reservation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html'
})
export class Reservation implements AfterViewInit {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Reservation Page');
  }

  ngAfterViewInit() {
    // $(document).ready(function() {
    //   console.log("Document loaded in ts");
    //   $('#btn-test').click(function() {
    //     $('#txt-test').hide();
    //   })
    // });
  }

}
