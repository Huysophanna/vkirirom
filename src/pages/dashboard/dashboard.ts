import { Component, Inject } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SMS, Toast, Geolocation } from 'ionic-native';
import { Membership } from '../membership/membership';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { Services } from '../services/services';
import { About } from '../about/about';
import { Reservation } from '../reservation/reservation';
import { Storage } from '@ionic/storage';
import { LocationTracker } from '../../providers/location-tracker';
import { Userscope } from '../../providers/userscope';
import 'rxjs/add/operator/filter';
import { Push, PushToken } from '@ionic/cloud-angular';

declare var cordova: any;

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styles: ['.header-md::after { background-image: none; }']
})

export class Dashboard {
  membership = Membership;
  Notification:any;

  constructor(public navCtrl: NavController, public storage: Storage, public push: Push, private locationTracker: LocationTracker, private userScope: Userscope) {
    
      //Push notification configuration
      this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
      }).then((t: PushToken) => {
          console.log('Token saved:', t.token);
      });
      this.push.rx.notification().subscribe((msg) => {
        this.Notification = msg.text;
      });

      setInterval(() => {
        this.kiriromScope();
      }, 2000);
  }

  kiriromScope() {
    console.log("testing scope");
    Geolocation.getCurrentPosition().then(resp => {
      let latitute = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      console.log("My Current Location :" + latitute + " " + longitude);
      var distance = this.userScope.distanceCal(latitute, longitude);
      console.log("Distance in dashboard :" + distance);
      if (distance < 1) {
        var test = distance * 1000;
        console.log("Distance is less than 1 :" + test + "m");
      } else {
        console.log("The Distance is : " + distance + "km");
        if (distance <= 17) {
          console.log("User in kirirom");
        } else {
          console.log("User out kirirom");
        }
      }
    }, (Error) => {
      console.log("Geolocation Error");
    });
  }

  navigate(num) {
    switch (num) {
      case 1: this.navCtrl.push(Reservation);
      break;
      case 2: this.navCtrl.push(Membership);
      break;
      case 3: this.navCtrl.push(GoogleMapPage);
      break;
      case 4: this.navCtrl.push(Chat);
      break;
      case 6: this.navCtrl.push(About);
      break;
    }
  }

  sos() {
    console.log("Sending SMS");
    document.addEventListener('deviceready', backgroundPosition, false);
    if (cordova.plugins.backgroundMode.isActive()){
        alert("Active");
        backgroundPosition();
    } else {
        alert("Not Active");
        Geolocation.getCurrentPosition().then(resp => {
          let latitude = resp.coords.latitude;
          let longitude = resp.coords.longitude;
          let number = "0962304669";
          let message = "http://maps.google.com/?q=" + latitude + "," + longitude + "";
          var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
              //  intent: 'INTENT'  // Opens Default sms app
              intent: '' // Sends sms without opening default sms app
            }
          }
          console.log("ready");
          alert("about to send");
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
        }, (Error) => {
          alert("Geolocation Error" + Error);
        })
    }

    function backgroundPosition() {
      cordova.plugins.backgroundMode.enable();
      cordova.plugins.backgroundMode.setDefaults({
        title: 'Chain vKirirom',
        text: 'vKirirom is running in the background'
      });

      cordova.plugins.backgroundMode.onactivate();
      cordova.plugins.backgroundMode.onactivate = function() {
        setInterval(() => {
          Geolocation.getCurrentPosition().then(resp => {
            let latitude = resp.coords.latitude;
            let longitude = resp.coords.longitude;
            pass(latitude, longitude);
          })
        }, 5000);

        function pass(latitude, longitude) {
          var lat = [];
          var lng = [];
          lat.push(latitude);
          lng.push(longitude);

          if (lat.length == 10 && lng.length == 10) {
            lat = [];
            lng = [];
          } else if (lat.length == 0 && lng.length == 0) {
            lat.push(latitude);
            lng.push(longitude);
          } else {
            alert("Ooupp! Something went wrong.");
          }

          var number = "0962304669";
          var message = "http://maps.google.com/?q=" + lat[lat.length-1] + "," + lng[lng.length-1] + "";
          var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
              //  intent: 'INTENT'  // Opens Default sms app
              intent: '' // Sends sms without opening default sms app
            }
          }

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

        }
      }
    }

  }
  ionViewDidLoad() {
    console.log('Hello Dashboard Page');
  }

}