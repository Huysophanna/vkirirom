import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from 'ionic-native';
import { Toast } from 'ionic-native';
import { Geolocation } from 'ionic-native';
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

  constructor(public navCtrl: NavController) {

  }

  navigate() {
    console.log("function is calling");
    this.navCtrl.push(Membership);
  }

  sos() {
    console.log("Sending SMS");
    Geolocation.getCurrentPosition()
      .then(resp => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        console.log(lat);
        console.log(lng);
        var number = "0962304669";
        var message = "http://maps.google.com/?q=" + lat + "," + lng + "";
        console.log(message);
        var options = {

          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          // android: {
          //     //  intent: 'INTENT'  // Opens Default sms app
          //     intent: '' // Sends sms without opening default sms app
          //   }
        }
        console.log("ready");
        SMS.send(number, message, options)
          .then(() => {
            alert("Please stay safe. Our team will be there so soon!");
            Toast.show("Please stay safe. Our team will be there so soon!", '5000', 'bottom').subscribe(
              toast => {
                console.log(toast);
              }
            );
          }, (error) => {
            alert(error);
            Toast.show("You cancelled the action", '5000', 'bottom').subscribe(
              toast => {
                console.log(toast);
              }
            );
          });
      },
      (Error) => {
        console.log("Geolocation error" + Error);
        Toast.show("Cannot get your location", '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      })
  }
  ionViewDidLoad() {
    console.log('Hello Dashboard Page');
  }
}