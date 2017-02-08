import { Component, Inject, NgZone } from '@angular/core';
import { NavController, Platform, AlertController, Events, ModalController, LoadingController } from 'ionic-angular';
import { SMS, Toast, Geolocation, Push, Network, NativeStorage, BackgroundGeolocation, Geofence } from 'ionic-native';
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { About } from '../about/about';
import { Reservation } from '../reservation/reservation';
import { Storage } from '@ionic/storage';
import { LocationTracker } from '../../providers/location-tracker';
import { Userscope } from '../../providers/userscope';
import { SettingService } from '../../providers/setting-service';
import { Modal } from '../modal/modal';

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
  lastLat: any;
  lastLng: any;

  constructor(private platform: Platform, public navCtrl: NavController, public storage: Storage, private locationTracker: LocationTracker, private userScope: Userscope, private alertCtrl: AlertController, public modalCtrl: ModalController, private loadingCtrl: LoadingController, public settingService: SettingService) {
      document.addEventListener('deviceready', function () {
          cordova.plugins.backgroundMode.setDefaults({ 
              title:  'TheTitleOfYourProcess',
              text:   'Executing background tasks.'
          });
          cordova.plugins.backgroundMode.enable();
          cordova.plugins.backgroundMode.onactivate = function () {
              setInterval(() => {
                alert("backgroundMode");
                Geolocation.getCurrentPosition().then(resp => {
                  let latitute = resp.coords.latitude;
                  let longitute = resp.coords.longitude;
                  let userlocation = [];
                  NativeStorage.getItem('userlocation').then(data => {
                    if (JSON.parse(data).length == 5) {
                      userlocation = [];
                      NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(data => {
                        console.log("Set user location success :" + data);
                      }, err => {
                        console.log("Set userlocation failed :" + err);
                      });
                    } else if (this.userlocation.length >= 0) {
                      userlocation.push({
                        lat: latitute,
                        lng: longitute
                      });
                      NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(data => {
                        console.log("Set user location success :" + data);
                      }, err => {
                        console.log("Set userlocation failed :" + err);
                      });
                    } else {
                      console.log("Oupp something went wrong!!!");
                    }
                  });
                });
              }, 2000);
          }
      }, false);
      this.locationTracker.lastLocationTracker();
      setInterval(() => {
        this.checkNetworkConnection();
        this.kiriromScope();
      }, 2000);
  }

  showNoti() {
    let notiModal = this.modalCtrl.create(Modal, { userId: 8675309 });
    notiModal.present();
  }

  kiriromScope() {
    Geolocation.getCurrentPosition().then(resp => {
      let latitute = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      console.log("My location :" + latitute + longitude);
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
            if (this.isKirirom === undefined) {
              let loader = this.loadingCtrl.create({
                content: 'Identifying your current location....',
                duration: 1000
              });
              loader.present();
            } else {
              if (this.isKirirom == false) {
                this.warningAlert("Outdoor Mode", "This function is not accessible from outside vKirirom area.");
              } else {
                this.navCtrl.push(Chat);
              }
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
                NativeStorage.getItem('userlocation').then(data => {
                  var parseUserlocation = JSON.parse(data);
                  this.lastLat = parseUserlocation[parseUserlocation.length - 1].lat;
                  this.lastLng = parseUserlocation[parseUserlocation.length - 1].lng;
                  var number = "0962304669";
                  var message = "http://maps.google.com/?q=" + this.lastLat + "," + this.lastLng + "";
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
                }, err => {
                  alert("Get user location failed : " + err);
                });
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