import { Component, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from 'ionic-native';
import { Toast } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import { Membership } from '../membership/membership';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { About } from '../about/about';
import { Storage } from '@ionic/storage';
import { Push, PushToken } from '@ionic/cloud-angular';
import { LocationTracker } from '../../providers/location-tracker';

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
  Notification:any;

  constructor(public navCtrl: NavController, public storage: Storage, public push: Push, public locationTracker: LocationTracker) {
    //Push notification configuration
      this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
      }).then((t: PushToken) => {
          console.log('Token saved:', t.token);
      });
      this.push.rx.notification().subscribe((msg) => {
        //   this.storage.set('push-notification', msg.text);
        this.Notification = msg.text;
      });
  }

  navigate(num) {
    switch (num) {
      case 2: this.navCtrl.push(Membership);
      break;
      case 3: this.navCtrl.push(GoogleMapPage);
      break;
      case 4: this.navCtrl.push(Chat);
      break;
<<<<<<< HEAD
      case 5: this.navCtrl.push(About);
=======
      case 6: this.navCtrl.push(About);
      break;
>>>>>>> 9425052068f538133dbad1533c16939fb1e1a547
    }
  }

  chat() {
    console.log("navigating to chat screen");
    this.navCtrl.push(Chat);
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
          android: {
              //  intent: 'INTENT'  // Opens Default sms app
              intent: '' // Sends sms without opening default sms app
            }
        }
        console.log("ready");
        alert("about to send");
        SMS.send(number, message)
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
        alert(Error)
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