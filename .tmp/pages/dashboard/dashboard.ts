import { Component, Inject, NgZone } from '@angular/core';
import { NavController, Platform, AlertController, Events } from 'ionic-angular';
import { SMS, Toast, Geolocation, Push } from 'ionic-native';
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
<<<<<<< HEAD
import { Services } from '../services/services';
=======
import { Signup } from '../signup/signup';
>>>>>>> 2d91407db487e7ac24fe10f94d7163e1f9cb0b12
import { About } from '../about/about';
import { Storage } from '@ionic/storage';
import { LocationTracker } from '../../providers/location-tracker';

<<<<<<< HEAD
declare var cordova: any;

=======
>>>>>>> bdf504739ce210ec2fceeb033e1baf26de1dc2d6
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styles: ['.header-md::after { background-image: none; }']
})

export class Dashboard {
  membership = Membership;
  Notification:any;

<<<<<<< HEAD
<<<<<<< HEAD
  constructor(public navCtrl: NavController, public storage: Storage, public push: Push, private locationTracker: LocationTracker) {
    
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
=======
  constructor(public navCtrl: NavController, public storage: Storage,  public locationTracker: LocationTracker, public platform: Platform) {

     
    // //Push notification configuration
    //   this.push.register().then((t: PushToken) => {
    //       return this.push.saveToken(t);
    //   }).then((t: PushToken) => {
    //       console.log('Token saved:', t.token);
    //   });
    //   this.push.rx.notification().subscribe((msg) => {
    //     //   this.storage.set('push-notification', msg.text);
    //     this.Notification = msg.text;
    //   });
>>>>>>> bdf504739ce210ec2fceeb033e1baf26de1dc2d6
=======
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
>>>>>>> 2d91407db487e7ac24fe10f94d7163e1f9cb0b12
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
<<<<<<< HEAD
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

=======
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
    
>>>>>>> 2d91407db487e7ac24fe10f94d7163e1f9cb0b12
  }
  ionViewDidLoad() {
    console.log('Hello Dashboard Page');
  }

}