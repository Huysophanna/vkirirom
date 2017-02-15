import { Component } from '@angular/core';
import { ViewController, Platform, NavController, AlertController, Events } from 'ionic-angular';
import { NativeStorage, LocationAccuracy, Diagnostic } from 'ionic-native';
import { SettingService } from '../../providers/setting-service';
import { FirebaseUserData } from '../../providers/firebase-user-data';
import firebase from 'firebase';

declare var cordova: any;
declare var io: any;

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {
  public loc: any;
  public noti: any;
  public socket: any;
  public token: any;
  public locationTag: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public settingService: SettingService, private firebaseUserData: FirebaseUserData, private platform: Platform, public viewCtrl: ViewController, public events: Events) {
    platform.ready().then(() => {
      // document.addEventListener('deviceready', function() {
      //   cordova.plugins.backgroundMode.ondeactivate = function() {
      //     alert("backgroundMode in setting");
      //   };
      // });
      NativeStorage.getItem('bgLocationTag').then(val => {
        Diagnostic.isLocationEnabled().then((enabled) => {
          if (enabled && val) {
            this.loc = enabled;
            this.firebaseUserData.updateBgLocationTag(enabled);
          } else {
            if (enabled) {
              // user location service is turned on and bgLocationTag is false
              // Turn off location service
              this.loc = val;
              this.firebaseUserData.updateBgLocationTag(val);
              this.forceUser();
            } else {
              // user location service is turned off and bgLocationTag is true
              // solution : set bgLocationTag to false
              this.loc = enabled;
              this.firebaseUserData.updateBgLocationTag(enabled);
            }
          }
        }, err => console.error(err));
        this.loc = val;
      }, err => {
        console.error("bgLocationTag error : " + err);
      });
    });
  }

  forceUser() {
    let confirm = this.alertCtrl.create({
      title: 'Switch to Location Setting',
      message: 'To use setting, Please turn off your location service',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            setTimeout(() => {
              this.forceUser();
            }, 200);
          }
        },
        {
          text: 'Agree',
          handler: () => {
          Diagnostic.switchToLocationSettings();
          Diagnostic.isLocationEnabled().then((enabled) => {
            if (enabled) {
              this.forceUser();
            } else {
              this.loc = enabled;
              this.firebaseUserData.updateBgLocationTag(enabled);
            }
          })
        }
      }
    ]
  });
  confirm.present();
}

  ionViewWillEnter() {
      this.platform.ready().then(() => {
        NativeStorage.getItem('settingToggleNotification').then(_val => {
          this.noti = _val;
        });
      });
      alert(this.noti);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  setNotification(data) {
    //emit events to turn off alert push notification
    this.events.publish("settingToggleNotification", data);
  }

  setLocation(data) {
    this.firebaseUserData.updateBgLocationTag(data);

    Diagnostic.isLocationEnabled().then((enabled) => {
      if ((enabled == true) && (data == false)) {
        // turn the location off
        let confirm = this.alertCtrl.create({
          title: 'One more step to turn your location off',
          message: 'Would you like to switch to the Location Settings page ?',
          buttons: [
            {
              text: 'Disagree',
              handler: () => {
                console.log('Disagree clicked');
                this.loc = true;
                this.firebaseUserData.updateBgLocationTag(enabled);
              }
            },
          {
            text: 'Agree',
              handler: () => {
                Diagnostic.switchToLocationSettings();
                Diagnostic.isLocationEnabled().then((enabled) => {
                  this.firebaseUserData.updateBgLocationTag(enabled);
                })
              }
            }
          ]
        });
        confirm.present();
      } else if ((enabled == false) && (data == true)) {
        // turn the location on
        LocationAccuracy.canRequest().then((canRequest: boolean) => {
          if(canRequest) {
            LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {
                this.loc = data;
                this.firebaseUserData.updateBgLocationTag(data);
              },
              error => {
                if (error) {
                  console.error("error code="+error.code+"; error message="+error.message);
                  if (error.code !== LocationAccuracy.ERROR_USER_DISAGREED) {
                    if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                      Diagnostic.switchToLocationSettings();
                      Diagnostic.isLocationEnabled().then((enabled) => {
                        this.firebaseUserData.updateBgLocationTag(enabled);
                      }, err => console.error("some logical error occur"))
                    }
                  } else {
                    this.loc = false;
                    this.firebaseUserData.updateBgLocationTag(this.loc);
                  }
                }
              }
            );
          }
        });
      } else {
        console.error("logical error");
      }
    }, err => console.error("isLocationEnabled error : " + err));
  }

}
