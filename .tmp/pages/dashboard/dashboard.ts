import { Component, NgZone } from '@angular/core';
import { BackgroundMode, SMS, Toast, Geolocation, Push, Network, NativeStorage, BackgroundGeolocation, Diagnostic } from 'ionic-native';
import { MenuController, NavController, Platform, AlertController, Events, ModalController, LoadingController } from 'ionic-angular';
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { About } from '../about/about';
import { LocationTracker } from '../../providers/location-tracker';
import { Userscope } from '../../providers/userscope';
import { SettingService } from '../../providers/setting-service';
import { Notificationpanel } from '../notificationpanel/notificationpanel';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

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
  connectionStatus: any;
  loading: any;
  lastLat: any;
  lastLng: any;
  deviceToken: any;
  launchCount: number = 0;
  locationPermissionDenied: any;
  getUserLocation: boolean;
  connectionWatchSubscription: any;
  isLocationEnable: any = true;
 
  notification_num :any;

  constructor(private platform: Platform, public navCtrl: NavController, private locationTracker: LocationTracker, private userScope: Userscope, private alertCtrl: AlertController, public modalCtrl: ModalController, private loadingCtrl: LoadingController, public settingService: SettingService, public events: Events, public menuCtrl: MenuController, public ngZone: NgZone, public http: Http) {
      
     
    
      this.checkNetworkConnection();
      platform.ready().then(() => {
        //show side menu if it's not login screen
        menuCtrl.enable(true);
        setInterval(() => {
         
         
          
          this.fetchUserGeoLocation();
          console.log("fetchUserGeoLocation in platform ready");
        }, 2000);
      });

      this.events.subscribe('notification_num', data => {
          this.getStorageItem();
         
         
      });

   
  }
 
  ionViewWillEnter() {
     this.getStorageItem()
    }
  showNoti() {
    let notiModal = this.modalCtrl.create(Notificationpanel);
    notiModal.present();
   

   
  this.ngZone.run(() => {
    this.notification_num= 0;
    });
    this.events.publish('clearnotification_num');
  }

  kiriromScope(latitute, longitute) {
    this.ngZone.run(() => {
      var distance = this.userScope.distanceCal(latitute, longitute);
      if (distance < 1) {
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
              this.warningAlert("Off-Kirirom Mode", "This function is not accessible outside kirirom area.");
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
        Geolocation.getCurrentPosition().then(resp => {
          this.isUnknown = false;
          let latitute = resp.coords.latitude;
          let longitute = resp.coords.longitude;

          BackgroundMode.enable();
            
            // BackgroundMode.onactivate().subscribe(() => {
            BackgroundMode.on("activate").subscribe(() => {
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
          this.events.publish('isKirirom', false);
          
          
        });
      } else {
        this.isLocationEnable = false;
        this.events.publish('isKirirom', false);
      }
    };
    let errorCallback = (e) => console.error(e);

    Diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);

  }

  sos() {
    if ((this.isKirirom == undefined) && (this.isUnknown == false)) {
      let loader = this.loadingCtrl.create({
        content: 'Identifying your current location....',
        duration: 1000
      });
      loader.present();
    } else if ((this.isKirirom == undefined) && (this.isUnknown == true) && (this.isLocationEnable == true)) {
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
        this.warningAlert("Off-Kirirom Mode", "This function is not accessible outside kirirom area.");
    } else if (this.isLocationEnable == false) {
      if (this.platform.is('ios')) {
          this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services");
      } else {
          this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location");
      }
    } else {
      this.checkNetworkConnection();
      if (this.connectionStatus === "internet") {
        this.presentSOSAlert("We will forward the request along with your current location to our supports. We suggest you not to move far away from your current position, as we're trying our best to get there as soon as possible.");
      } else {
        this.presentSOSAlert("We will generate a SMS along with your current location to our supports. We suggest you not to move far away from your current position, as we're trying our best to get there as soon as possible. \n (Standard SMS rates may apply)");
      }
    }
  }


  presentSOSAlert(message) {
    let confirmAlert = this.alertCtrl.create({
            title: 'Emergency SOS',
            message: message,
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
                  var number = ["+13343758067"];
                  var message = "Please help! I'm currently facing an emergency problem. Here is my Location: http://maps.google.com/?q=" + this.lastLat + "," + this.lastLng + "";
                  var options = {
                  replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                       intent: 'INTENT'  // Opens Default sms app
                      // intent: '' // Sends sms without opening default sms app
                    }
                  }

                  if (this.connectionStatus === 'internet') {

                    this.makeToast("Requesting help to vKirirom Team using internet connection. Please stay safe and wait ...");
                        // reqeust twilio api
                        this.http.get('https://emergencysms.herokuapp.com/emergency_request?Body=' + message + '&From='+ firebase.auth().currentUser.displayName).map(res => res.json()).subscribe(data => {
                        
                          if (data.feedback.code == 200) {
                            this.warningAlert('Send Sucesss', 'Your emergency message has been sent sucessfully! Please stay safe while our team is trying best to reach you.');
                          } else if (data.feedback.code == 300) {
                            this.warningAlert('Message is already sent', 'Your emergency message has already been sent. Please stay safe and wait for our team there. We will try our best to rescure as soon as possible.');
                          } else {
                            this.warningAlert('Operation Error', 'There is an error occur with our operation. Please contact us by our contact number.');
                          }
                          
                        }, (error) => {
                          this.warningAlert('Connection Problem', 'There is problem due to internet connection. Please try again.');
                        });
                
                  } else {
                    // send SMS
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
                  }
                }, err => {
                  this.warningAlert("Get user location from storage failed", err);
                });
              }
            }],
            cssClass: 'emergencyAlert'
          });
        confirmAlert.present();
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
              this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > App > vKclub > Permission > Location");
              message = "";
          }
      break;
      case 3: message = 'Welcome to vKirirom. Experience full features of vKclub with In-Kirirom mode including Emergency SOS & Group Chat';
      break;
      case 4: message = 'Off-Kirirom mode is on. Emergency SOS & Group Chat features are not accessible for Off-Kirirom users.';
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
      this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > App > vKclub > Permission > Location");
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

  checkNetworkConnection() {
    if ((<string> Network.type === 'none')) {
        this.connectionStatus = "No internet";
    } else {
        this.connectionStatus = "internet";
    }
  }

  getStorageItem() {
      NativeStorage.getItem('notification_num').then(notifications => {
        this.ngZone.run(() => {
        this.notification_num = notifications;
        });
          
      });
  }



}