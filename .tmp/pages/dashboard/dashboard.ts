import { Component, Inject, NgZone } from '@angular/core';
import { NavController, Platform, AlertController, Events } from 'ionic-angular';
import { SMS, Toast, Geolocation, Push } from 'ionic-native';
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { Signup } from '../signup/signup';
import { About } from '../about/about';
import { Storage } from '@ionic/storage';
import { LocationTracker } from '../../providers/location-tracker';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styles: ['.header-md::after { background-image: none; }']
})

export class Dashboard {
  membership = Membership;
  Notification:any;

  constructor(public navCtrl: NavController, public storage: Storage,  public locationTracker: LocationTracker, public platform: Platform, public alertCtrl: AlertController, public events: Events, public ngZone: NgZone) {
    // this.events.subscribe('foreground-marketing-notification', data => {
    //   this.Notification = data;
    // });
    // this.events.subscribe('background-marketing-notification', data => {
    //   this.ngZone.run(() => {
    //     this.Notification = data;
    //   });
    //   alert(this.Notification);
    // });
  }

  navigate(num) {
    switch (num) {
      case 1: this.navCtrl.push(Services);
      break;
      case 2: this.navCtrl.push(Membership);
      break;
      case 3: this.navCtrl.push(GoogleMapPage);
      break;
      case 4: this.navCtrl.push(Chat);
      break;
      case 5: this.navCtrl.push(Signup);
      break;
      case 6: this.navCtrl.push(About);
      break;
    }
  }

  sos() {
    let confirmAlert = this.alertCtrl.create({
          title: 'Emergency SOS',
          message: 'We will send a SMS along with your current location to our supports',
          buttons: [{
            text: 'Cancel',
            role: 'cancel'
          }, {
            text: 'Confirm',
            handler: data => {
              console.log("Sending SMS");
              Geolocation.getCurrentPosition()
                .then(resp => {
                  let lat = resp.coords.latitude;
                  let lng = resp.coords.longitude;
                  var number = "0962304669";
                  var message = "Please Help! I got an emergency problems. This is my location: http://maps.google.com/?q=" + lat + "," + lng + "";
                  var options = {
                    replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                        //  intent: 'INTENT'  // Opens Default sms app
                        intent: '' // Sends sms without opening default sms app
                      }
                  }

                SMS.send(number, message).then(() => {
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
          }]
        });
    confirmAlert.present();
    
  }
  ionViewDidLoad() {
    console.log('Hello Dashboard Page');
  }

}