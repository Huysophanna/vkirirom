import { Component, ViewChild, Input, NgZone } from '@angular/core';
import { ModalController, ToastController, Nav, Platform, ActionSheetController, AlertController, LoadingController, NavController, Events } from 'ionic-angular';
import { Splashscreen, Toast, Camera, StatusBar, Facebook, NativeStorage, CallNumber, Keyboard, Geolocation, BackgroundGeolocation, Geoposition, BackgroundMode, Push } from 'ionic-native';
import { Api } from '../providers/api';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Editprofile } from '../pages/editprofile/editprofile';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Setting } from '../pages/setting/setting';
import { Chatmessage } from '../pages/chatmessage/chatmessage';
import { Introslides } from '../pages/introslides/introslides';
import { GoogleMapPage } from '../pages/map/map';
import { Signup } from '../pages/signup/signup';
import { Resetpw } from '../pages/resetpw/resetpw';
import { AuthData } from '../providers/auth-data';
import 'whatwg-fetch';

declare var cordova: any;
declare var window: any;

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = Dashboard;
  isHome: boolean = false;
  pages: any = []
  authData: any = AuthData;
  loading: any;
  userName: any;
  userPhoto: any;
  userEmail: any;
  fbID: any;
  pushNotifications: any;
  pushNotificationTitle: any;
  storeNotificationsArray: any = [];
  currentUser: any;
  isFacebookUser: boolean;
  isEmailUser: boolean;
  isChatMessageScreen: any;

  constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public events: Events, public ngzone: NgZone) {
    platform.ready().then(() => {
      //hide the splash screen only when decided the root page
      Splashscreen.hide();
      this.getStorageItem();
      //push configuration
      let push = Push.init({
        android: {
          senderID: "82070365426"
        },
        ios: {
          alert: 'true',
          badge: 'true',
          sound: 'true',
          senderID: "82070365426",
          gcmSandbox: "true"
        },
        windows: {}
      });


      push.on('registration', (data) => {
        NativeStorage.setItem('deviceToken', data.registrationId);
      });
      push.on('notification', (data) => {
        //store all notifications to local storage for the notification panel
        this.storeNotificationsArray.push(data);
        NativeStorage.setItem('storeNotificationsArray', this.storeNotificationsArray);

        let self = this;
        let confirmAlert: any;

        //event listens to check if chat message screen is active
        this.events.subscribe("isChatMessageScreen", val => {
          this.isChatMessageScreen = val;
        });

        //if user using app and push notification comes
          if (data.additionalData.foreground) {
            
              // if application open on foreground, show popup
              if (data.title.indexOf('New message') >= 0) {
                //alert notification for chat messages

                if (this.isChatMessageScreen != "true") {
                  //push notification, present alert except chat message screen
                  confirmAlert = this.alertCtrl.create({
                    title: data.title,
                    message: data.message,
                    buttons: [{
                      text: 'Ignore',
                      role: 'cancel'
                    }, {
                      text: 'View',
                      handler: () => {
                        self.nav.push(Chatmessage, { message: data.message });
                      }
                    }]
                  }).present();
                }

              } else {
                // this.events.publish('foreground-marketing-notification', data.message);
                let title = "Hi, " + this.userName;
                this.warningAlert(title, data.message);
              }
            
          } else {
            //if user NOT using app and push notification comes
            if (data.title.indexOf('New message') >= 0) {
              self.nav.push(Chatmessage, { message: data.message });
            }
          }

      });
      push.on('error', (e) => {
        console.log(e.message);
      });


      //firebase configuration
      firebase.initializeApp({
        apiKey: "AIzaSyDorWd2MGbJbVjHiKvL3jo2F1qe31A6R08",
        authDomain: "vkirirom-809f8.firebaseapp.com",
        databaseURL: "https://vkirirom-809f8.firebaseio.com",
        storageBucket: "vkirirom-809f8.appspot.com",
        messagingSenderId: "82070365426"
      });
      firebase.auth().onAuthStateChanged((user) => {
        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        if (!user) {
          this.loading.present();
          this.loading.dismiss();
          // this.rootPage = Login;

          //logic for intro slides
          NativeStorage.getItem("introShown").then(success => {
              //intro slider is already shown before
              this.rootPage = Login;
          }, error => {
              //first time, need to show intro slides
              this.rootPage = Introslides;
              NativeStorage.setItem("introShown", true);
          });
        } else if (user) {
          this.currentUser = firebase.auth().currentUser.providerData;

          //identify whether the user is signed in using Facebook or Email
          firebase.auth().currentUser.providerData.forEach(element => {
            this.isFacebookUser = element.providerId == 'facebook.com' ? true : false;
            this.isEmailUser = element.providerId == 'password' ? true : false;
          });
        }

      });
      StatusBar.styleDefault();

      //listen for events
      this.events.subscribe("UserLogin", name => {
        this.currentUser = firebase.auth().currentUser;
        this.getStorageItem();
      });

    });

    // set our app's pages
    this.pages = [
      { title: 'Setting', id: 1, ionicon: 'ios-settings-outline' },
      { title: 'Contact Us', id: 2, ionicon: 'ios-call-outline' },
      { title: 'Log Out', id: 3, ionicon: 'ios-exit-outline' }
    ];
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Update Profile Picture',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            // this.takePicture(Camera.PictureSourceType.CAMERA);
            this.doGetPicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Select from Photo Library',
          handler: () => {
            // this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
            this.doGetPicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  doGetPicture(imageSource) {
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      allowEdit : true,
      targetWidth: 300,
      targetHeight: 300,
      sourceType: imageSource,
      correctOrientation: true,
    }).then(_imagePath => {
      // this.warningAlert("Success", "Path: " + _imagePath);
      //convert picture to blob
      return this.makeFileIntoBlob(_imagePath);
    }).then(_imageBlob => {
      // this.warningAlert("Success blob", "Path: " + _imageBlob);
      //upload the blob
      return this.uploadToFirebase(_imageBlob);
    }).then((_uploadSnapShot: any) => {
      // this.warningAlert("Success", _uploadSnapShot.downloadURL);

      //store reference to storage in database
      return this.saveToDatabaseAssetList(_uploadSnapShot);

    }).then((_uploadSnapShot: any) => {
      this.makeToast("Success! New profile picture is updated.");
    }, error => {
      this.makeToast("Uploaded profile picture failed! There is a problem with network connection.");
    });
  }

  makeFileIntoBlob(_imagePath) {

    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }


  uploadToFirebase(_imageBlob) {
    var fileName = this.userName + '.jpg';
    return new Promise((resolve, reject) => {
      let profilePhotoRef = firebase.storage().ref('profile_photo/' + fileName);
      var uploadTask = profilePhotoRef.put(_imageBlob);

      profilePhotoRef.delete().then(success => {
        //success callback
      }, error => {
        //error callback
      });

      uploadTask.on('state_changed', _snapshot => {
        console.log("snapshot progress" + _snapshot);
      }, _error => {
        reject(_error);
      }, () => {
        //completion
        resolve(uploadTask.snapshot);
        // });
      });
    });
  }


  saveToDatabaseAssetList(_uploadSnapShot) {
    // alert(_uploadSnapShot.downloadURL);
    // alert(JSON.stringify(this.currentUser));
    this.currentUser.updateProfile({
      displayName: this.userName,
      photoURL: _uploadSnapShot.downloadURL
    }).then(() => {
      this.ngzone.run(() => {
        this.userPhoto = _uploadSnapShot.downloadURL;
        //replace new profile photo to the storage item
        NativeStorage.setItem("userPhoto", _uploadSnapShot.downloadURL);
      });
      // alert(JSON.stringify(this.currentUser));
    });
  }


  getStorageItem() {
    NativeStorage.getItem('userPhoto').then(data => {
      this.ngzone.run(() => {
        this.userPhoto = data;
      });

    });
    NativeStorage.getItem('userDetails').then(data => {
      this.ngzone.run(() => {
        this.userName = data.displayName;
        this.userEmail = data.email;
      });
    });
    NativeStorage.getItem('storeNotificationsArray').then(notifications => {
      this.storeNotificationsArray = notifications;
    });
  }

  editProfilePressed() {
    if (this.isEmailUser) {
      let editModal = this.modalCtrl.create(Editprofile);
      editModal.present();
    } else if (this.isFacebookUser) {
      this.warningAlert("Facebook Linked","You are currently linked your profile with Facebook account.");
    }
  }

  openPage(page) {
    //logout function
    switch (page.id) {
      case 1:
        this.nav.push(Setting);
        break;
      case 2:

        CallNumber.callNumber("0962304669", true);
        break;
      case 3:
        //store userProfile object to the phone storage
        Facebook.logout();
        NativeStorage.setItem('userDetails', "");
        this.nav.setRoot(Login);
        console.log(page.title);
        break;
    }
  }

  openHome() {
    //this.nav.setRoot(Page1);
    this.isHome = false;
  }

  warningAlert(title, message) {
    this.alertCtrl.create({
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

  presentLoading(content) {
 
    this.loading = this.loadingCtrl.create({
      content: content
    });
 
    this.loading.present();
 
  }

}
