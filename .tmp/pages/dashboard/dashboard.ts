import { Component, Inject, NgZone, AfterContentChecked } from '@angular/core';
import { BackgroundMode, SMS, Toast, Geolocation, Push, Network, NativeStorage, BackgroundGeolocation, Diagnostic } from 'ionic-native';
import { MenuController, NavController, Platform, AlertController, Events, ModalController, LoadingController } from 'ionic-angular';
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { About } from '../about/about';
import { Reservation } from '../reservation/reservation';
import { LocationTracker } from '../../providers/location-tracker';
import { Userscope } from '../../providers/userscope';
import { SettingService } from '../../providers/setting-service';
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
  lastLat: any;
  lastLng: any;
  deviceToken: any;
  launchCount: number = 0;
  locationPermissionDenied: any;
  getUserLocation: boolean;
  connectionWatchSubscription: any;
  isLocationEnable: any = true;

  constructor(private platform: Platform, public navCtrl: NavController, private locationTracker: LocationTracker, private userScope: Userscope, private alertCtrl: AlertController, public modalCtrl: ModalController, private loadingCtrl: LoadingController, public settingService: SettingService, public events: Events, public menuCtrl: MenuController, public ngZone: NgZone) {
      platform.ready().then(() => {
        //show side menu if it's not login screen
        menuCtrl.enable(true);
        var fetchUserLocation = setInterval(() => {
          this.fetchUserGeoLocation();
          console.log("fetchUserGeoLocation in platform ready");
        }, 2000);
      });
  }


  showNoti() {
    let notiModal = this.modalCtrl.create(Notificationpanel);
    notiModal.present();
  }

  kiriromScope(latitute, longitute) {
    this.ngZone.run(() => {
      var distance = this.userScope.distanceCal(latitute, longitute);
      if (distance < 1) {
        var test = distance * 1000;
        this.isKirirom = true;
        this.isUnknown = false;
        this.events.publish('isKirirom', this.isKirirom);
        NativeStorage.setItem('mapFirstInitialization', true);
      } else {
        if (distance <= 17) {
          this.isKirirom = true;
          this.isUnknown = false;
          NativeStorage.setItem('mapFirstInitialization', true);
          this.events.publish('isKirirom', this.isKirirom);
        } else {
          this.isKirirom = false;
          this.isUnknown = false;
          this.events.publish('isKirirom', this.isKirirom);
        }
      }

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
        case 3:
          if (this.platform.is('android')) {
            if (this.locationPermissionDenied) {
              this.warningAlert("Unidentified App Mode", "Location permission denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > App > vKclub > Permission > Location");
            } else {                
              this.navCtrl.push(GoogleMapPage);  
            }
            // NativeStorage.getItem('mapFirstInitialization').then(data => {
            //   this.navCtrl.push(GoogleMapPage);
            // }, error => {
            //   //first time launch the map after installing the app
            //   if (this.locationPermissionDenied) {
            //     this.warningAlert('Location Permission Denied','Map function requires to Turn ON location service only for the first initialization. Please allow turning on, later you can use this as offline map.');
            //   } else {                
            //     this.navCtrl.push(GoogleMapPage);  
            //   }

            // });
            
          } else {
            //is iOS platform
            this.navCtrl.push(GoogleMapPage);
          }
        
        break;
        case 4:
            if ((this.isKirirom == undefined) && (this.isUnknown == false) && (this.isLocationEnable == true)) {
              let loader = this.loadingCtrl.create({
                content: 'Identifying your current location....',
                duration: 1000
              });
              loader.present();
            } else if ((this.isKirirom == undefined) && (this.isUnknown == true)){
              if (this.locationPermissionDenied) {
                //if the location is denied or turn off by user
                this.permissionDeniedWarning();
              } else if (this.getUserLocation == false){
                //can't get location 
                this.makeToast('There a problem getting your current location. Please allow the internet connectivity or relaunch the app and try again.');
              } else {
                this.warningAlert("Location failed", 'There is a problem getting your current location. Please try relaunch the app.');
              }
            } else if ((this.isKirirom == false) && (this.isUnknown == false)) {
              this.warningAlert("OffSite Mode", "This function is not accessible outside kirirom area.");
            } else if (this.isLocationEnable == false) {
              if (this.platform.is('ios')) {
                this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services");
              } else {
                this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location");
              }
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

  fetchUserGeoLocation() {
    let successCallback = (isEnabled) => {
      // alert('Is available? ' + isEnabled);
      if (isEnabled) {
        this.isLocationEnable = true;
        Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(resp => {
          this.isUnknown = false;
          let latitute = resp.coords.latitude;
          let longitute = resp.coords.longitude;

          BackgroundMode.enable();
            
            BackgroundMode.onactivate().subscribe(() => {
              let userlocation = [];
                NativeStorage.getItem('userlocation').then(data => {

                  if (JSON.parse(data).length >= 5) {
                    userlocation = [];
                    NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(data => {
                      console.log("Set user location success :" + data);
                    }, err => {
                      console.log("Set userlocation failed :" + err);
                    });
                  } else if ((JSON.parse(data).length >= 0) && (JSON.parse(data).length < 5)) {
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
                    console.log("Error, went wrong!!! " + JSON.parse(data).length);
                  }
                }, err => {
                  userlocation.push({
                    lat: latitute,
                    lng: longitute
                  });
                  NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(data => {
                    console.log("Set user location success :" + data);
                  }, err => {
                    console.log("Set user location failed :" + err);
                  });
                });
            }, err => console.error(err));
          this.locationTracker.lastLocationTracker(latitute, longitute);
          // alert(latitute + "  " + longitute);
          this.kiriromScope(latitute, longitute);
        }, err => {
          switch(err.code) {
            //check
            case err.PERMISSION_DENIED:
              this.locationPermissionDenied = true;
              break;
            case err.POSITION_UNAVAILABLE:
              this.getUserLocation = false;
              break;
            case err.TIMEOUT:
            this.makeToast('There is a problem getting your current location. Please try relaunch the app.');
              break;
            case err.UNKNOWN_ERROR:
              this.makeToast('There is a problem getting your current location. Please try relaunch the app.');
              break;
          }

          this.isUnknown = true;
        });
      } else {
        this.isLocationEnable = false;
      }
    };
    let errorCallback = (e) => console.error(e);

    Diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);

  }

  sos() {
    if ((this.isKirirom == undefined) && (this.isUnknown == false) && (this.isLocationEnable == true)) {
      let loader = this.loadingCtrl.create({
        content: 'Identifying your current location....',
        duration: 1000
      });
      loader.present();
    } else if ((this.isKirirom == undefined) && (this.isUnknown == true)) {
        if (this.locationPermissionDenied) {
            //if the location is denied or turn off by user
            this.permissionDeniedWarning();
        } else if (this.getUserLocation == false){
            //can't get location 
            this.makeToast('There a problem getting your current location. Please allow the internet connectivity or relaunch the app and try again.');
        } else {
            this.warningAlert("Location failed", 'There is a problem getting your current location. Please try relaunch the app.');
        }
    } else if ((this.isKirirom == false) && (this.isUnknown == false)) {
        this.warningAlert("Outdoor Mode", "This function is not accessible from outside vKirirom area.");
    } else if (this.isLocationEnable == false) {
      if (this.platform.is('ios')) {
          this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services");
      } else {
          this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location");
      }
    } else {
        let confirmAlert = this.alertCtrl.create({
            title: 'Emergency SOS',
            message: "We will generate a SMS along with your current location to our supports. We suggest you not to move far away from your current position, as we're trying our best to get there as soon as possible. \n (Standard SMS rates may apply)",
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
                  var number = ["0962222735", "078777346", "010254531"];
                  var message = "Please help! I'm currently facing an emergency problem. Here is my Location: http://maps.google.com/?q=" + this.lastLat + "," + this.lastLng + "";
                  var options = {
                  replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                       intent: 'INTENT'  // Opens Default sms app
                      // intent: '' // Sends sms without opening default sms app
                    }
                  }

                  SMS.send(number, message, options)
                    .then(() => {
                      // Toast.show("Please stay safe. Our team will be there so soon!", '5000', 'bottom').subscribe(
                      //   toast => {
                      //     console.log(toast);
                      //   }
                      // );
                      console.log("Message sent success");
                    }, (error) => {
                      // Toast.show("You cancelled the action", '5000', 'bottom').subscribe(
                      //   toast => {
                      //     console.log(toast);
                      //   }
                      // );
                      console.log("User cancel the action");
                    });
                }, err => {
                  this.warningAlert("Get user location from storage failed", err);
                });
              }
            }]
          });
        confirmAlert.present();
    }
  }

  //show app mode description when it's clicked
  modeClicked(_val) {
    let message;
    switch (_val) {
      case 1: message = 'Identifying your location to determine application mode.';
      break;
      case 2: 
          if (this.platform.is('ios')) {
              this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services > vKclub > Always");
              message = "";
          } else {
              this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location > vKclub > Permissions > Location.");
              message = "";
          }
      break;
      case 3: message = 'Welcome to vKirirom. Experience full features of vKclub with OnSite mode including Emergency SOS & Group Chat';
      break;
      case 4: message = 'OffSite mode is on. Emergency SOS & Group Chat features are not accessible for OffSite users.';
      break;
      case 5:
        if (this.platform.is('ios')) {
          this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services");
          message = "";
        } else {
          this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location");
          message = "";
        }
      break;
    }

    this.makeToast(message);
  }

  permissionDeniedWarning() {
    if (this.platform.is('ios')) {
      this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services > vKclub > Always");
    } else {
      this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location > vKclub > Permissions > Location.");
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

  makeToast(message) {
    Toast.show(message, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
    );
  }

}