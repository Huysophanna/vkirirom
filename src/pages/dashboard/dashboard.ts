import { Component, Inject, NgZone } from '@angular/core';
import { NavController, Platform, AlertController, Events, ModalController, LoadingController } from 'ionic-angular';
import { NativeStorage, SMS, Toast, Geolocation, Push, Network } from 'ionic-native';
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { About } from '../about/about';
import { Reservation } from '../reservation/reservation';
import { Storage } from '@ionic/storage';
import { LocationTracker } from '../../providers/location-tracker';
import { Userscope } from '../../providers/userscope';
import { Notificationpanel } from '../notificationpanel/notificationpanel';

declare var cordova: any;

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styles: ['.header-md::after { background-image: none; }']
})

export class Dashboard {
  membership = Membership;
  Notification:any;
  test: any;
  isKirirom: boolean;
  isUnknown: boolean = false;
  connectionStatus: boolean;
  loading;
  deviceToken: any;

  constructor(public events: Events, public navCtrl: NavController, public storage: Storage, private locationTracker: LocationTracker, private userScope: Userscope, private alertCtrl: AlertController, public modalCtrl: ModalController, private loadingCtrl: LoadingController) {
      setInterval(() => {
        this.checkNetworkConnection();
        this.kiriromScope();
      }, 2000);
  }


showNoti() {
  let notiModal = this.modalCtrl.create(Notificationpanel);
  notiModal.present();
}

  kiriromScope() {
    Geolocation.getCurrentPosition().then(resp => {
      let latitute = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      var distance = this.userScope.distanceCal(latitute, longitude);
      if (distance < 1) {
        var test = distance * 1000;
        this.isKirirom = true;
      } else {
        if (distance <= 17) {
          this.isKirirom = true;
        } else {
          this.isKirirom = false;
        }
      }
    }, (Error) => {
      console.log("Geolocation Error :" + this.isKirirom);
      this.isUnknown = true;
    });
  }

  navigate(num) {
      switch (num) {
        case 1: this.navCtrl.push(Services);
        break;
        case 2:
          this.warningAlert("Coming Soon!", "Introducing vKirirom Membership Card with vPoints, will be available soon.");
          // this.navCtrl.push(Membership);
        break;
        case 3: this.navCtrl.push(GoogleMapPage);
        break;
        case 4:
            if (this.isKirirom == false) {
              this.warningAlert("Outdoor Mode", "This function is not accessible from outside vKirirom area.");
            } else {
              this.navCtrl.push(Chat);
            }
        break;
        case 5: this.warningAlert("Coming Soon!", "Introducing vKirirom Media, will be available soon.");
        break;
        case 6: this.navCtrl.push(About);
        break;
      }
  }

  sos() {
    if (this.isKirirom == false) {
        this.warningAlert("Outdoor Mode", "This function is not accessible from outside vKirirom area.");
    } else {
        let confirmAlert = this.alertCtrl.create({
            title: 'Emergency SOS',
            message: 'We will send a SMS along with your current location to our supports',
            buttons: [{
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Confirm',
              handler: data => {
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
              }
            }]
          });
        confirmAlert.present();
    }
  }

  warningAlert(title, message) {
    this.alertCtrl.create( {
        title: title,
        message: message,
        buttons: [{
          text: 'Okay',
          role: 'cancel'
        }]
    }).present();
  }

  checkNetworkConnection() {
    if ((<string> Network.connection === 'none')) {
        this.connectionStatus = false;
        this.isKirirom = false;
    } else {
        this.connectionStatus = true;
    }
  }

}