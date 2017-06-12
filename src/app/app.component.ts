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
import { FirebaseUserData } from '../providers/firebase-user-data';
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
  isAuthenticated: any;
  isChangingProfilePicture: any;
  settingToggleNotification: any;
  isLoggedOut: any;
  confirmAlert: any;
  isKirriom = false;


  constructor(public modalCtrl: ModalController, private firebaseUserData: FirebaseUserData, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public events: Events, public ngzone: NgZone, public actionsheetController: ActionSheetController) {
    this.presentLoading('Authenticating');
    platform.ready().then(() => {
      setTimeout(() => {
        Splashscreen.hide();
        this.loading.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
      }, 1000);
    
      this.getStorageItem();
      this.firebaseUserData.retrieveUserData();
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
          gcmSandbox: "true",
        },
        windows: {}
      });

      //event listens to check if the user turn OFF/ON notification in Setting
      this.events.subscribe('settingToggleNotification', val => {
        this.settingToggleNotification = val;
        NativeStorage.setItem('settingToggleNotification', val);
      });
      //event listens to check if chat message screen is active
      this.events.subscribe("isChatMessageScreen", val => {
        this.isChatMessageScreen = val;
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
          this.ngzone.run(() => {
            // console.log("onAuthStateChanged");
            if (user) {
              //identify whether the user is signed in using Facebook or Email
              firebase.auth().currentUser.providerData.forEach(element => {
                this.isFacebookUser = element.providerId == 'facebook.com' ? true : false;
                this.isEmailUser = element.providerId == 'password' ? true : false;
              });

              if (user.emailVerified || this.isFacebookUser) {
                // alert("user: " + user.emailVerified);
                this.isLoggedOut = false;
                // NativeStorage.setItem('userAuthService', true);
                this.currentUser = firebase.auth().currentUser;
                
                
              } else {
                NativeStorage.getItem("introShown").then(success => {
                    //intro slider is already shown before
                    this.rootPage = Login;
                }, error => {
                    //first time, need to show intro slides
                    this.rootPage = Introslides;
                    //set toggle notification setting to be ON for the first time
                    NativeStorage.setItem('settingToggleNotification', 'ON');
                });
              }

            } else {
              NativeStorage.getItem("introShown").then(success => {
                  //intro slider is already shown before
                  this.rootPage = Login;
              }, error => {
                  //first time, need to show intro slides
                  this.rootPage = Introslides;
                  //set toggle notification setting to be ON for the first time
                  NativeStorage.setItem('settingToggleNotification', 'ON');
              });
            }
            
          });
          
        });
      

      
      push.on('registration', (data) => {
        NativeStorage.setItem('deviceToken', data.registrationId);
      });
      push.on('notification', (data) => {

        this.events.subscribe("isKirirom", isKirirom => {
          this.isKirriom = isKirirom;
        });

        if (this.settingToggleNotification == 'ON' && this.isLoggedOut == false && this.isKirriom) {

          //store all notifications to local storage for the notification panel
          this.storeNotificationsArray.push(data);
          NativeStorage.setItem('storeNotificationsArray', this.storeNotificationsArray);
          

          let self = this;
          
          
          //if user using app and push notification comes
            if (data.additionalData.foreground) {
                // if application open on foreground, show popup
                if (data.title.indexOf('New message') >= 0) {
                  //alert notification for chat messages
                  if (this.isChatMessageScreen != "true") {
                    //push notification, present alert except chat message screen
                    

                    if (this.confirmAlert != undefined) {
                      this.confirmAlert.dismiss();
                    }
                    
                    this.confirmAlert = this.alertCtrl.create({
                      title: data.title,
                      message: data.message,
                      enableBackdropDismiss: false,
                      buttons: [{
                        text: 'Ignore',
                      }, {
                        text: 'View',
                        handler: () => {
                          self.nav.push(Chatmessage, { message: data.message });
                        }
                      }]
                    });
                    this.confirmAlert.present();
                  }
                } else {
                  // this.events.publish('foreground-marketing-notification', data.message);
                  let title = "Hi, " + this.userName;
                  let message = data.title + ': ' + data.message;
                  this.warningAlert(title, message);
                }
              
            } else {
              //if user NOT using app and push notification comes
              if (data.title.indexOf('New message') >= 0) {
                self.nav.push(Chatmessage, { message: data.message });
              }
            }
        } //end of setting notification condition

      });
      push.on('error', (e) => {
        console.log(e.message);
      });

      this.events.subscribe('clearNotification', data => {
        this.storeNotificationsArray = [];
        NativeStorage.setItem('storeNotificationsArray', []);
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
      title: 'Upload Profile Picture',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.doGetPicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Select from Photo Library',
          handler: () => {
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
      correctOrientation: true
    }).then(_imagePath => {
      //variable indicates user changing profile picture
      this.isChangingProfilePicture = true;
      
      //convert picture to blob
      return this.makeFileIntoBlob(_imagePath);
    }).then(_imageBlob => {
      //upload the blob
      return this.uploadToFirebase(_imageBlob);
    }, error => {
      //user cancelled, not selecting any photos
    });
  }

  getOpacity() {
    if (this.isChangingProfilePicture) {
      return 0.3;
    } else {
      return 1;
    }
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
    var fileName = this.userName + "_" + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + "_" + new Date().toLocaleTimeString() +'.jpg';
    return new Promise((resolve, reject) => {
      let profilePhotoRef = firebase.storage().ref('profile_photo/' + fileName);
      var uploadTask = profilePhotoRef.put(_imageBlob);

      //upload image to firebase storage after current image is deleted
        uploadTask.on('state_changed', _snapshot => {
          console.log("snapshot progress" + _snapshot);
        }, _error => {
          reject(_error);

          if (_error.message.indexOf('Max retry time for operation exceeded') >= 0) {
            this.makeToast("Uploaded failed! Poor network connection. Please try again.");
          }
        }, () => {
          //completion, update imgURL of the user in firebase and set to device storage
          this.currentUser.updateProfile({
            displayName: this.userName,
            photoURL: uploadTask.snapshot.downloadURL
          }).then(() => {
            this.ngzone.run(() => {
              this.userPhoto = uploadTask.snapshot.downloadURL;
              //replace new profile photo to the storage item
              NativeStorage.setItem("userPhoto", uploadTask.snapshot.downloadURL);
            });

            this.makeToast("Success! New profile picture is now updated.");

            //variable indicates user's profile picture finished changing
            this.isChangingProfilePicture = false;
          });
        });
    });
  }

  getStorageItem() {
    
    NativeStorage.getItem('userPhoto').then(data => {
      this.ngzone.run(() => {
        this.userPhoto = data;
      });
    });
    NativeStorage.getItem('settingToggleNotification').then(_toggle => {
      this.settingToggleNotification = _toggle;
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
      this.makeToast("You are currently linked your profile with Facebook account.");
    }
  }

  openPage(page) {
    //logout function
    switch (page.id) {
      case 1:
        let presentModal = this.modalCtrl.create(Setting , {"settingToggleNotification": this.settingToggleNotification});
        presentModal.present();
        break;
      case 2:
        let actionSheet = this.actionsheetController.create({
          title: 'Contact',
            buttons: [
               {
                text: 'English/Khmer Speaker: (+855) 78 777 284',
                handler: () => {
                  console.log('Reservation clicked');
                  CallNumber.callNumber("078777284", true);
                }
              }, {
                text: 'Khmer Speaker: (+855) 96 2222 735',
                handler: () => {
                  console.log('Reservation clicked');
                  CallNumber.callNumber("0962222735", true);
                }
              }, {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log("cancel clicked");
                }
              }
            ]
        });
        actionSheet.present();
      break;
      case 3:
        //store userProfile object to the phone storage
        Facebook.logout();
        NativeStorage.setItem('userDetails', "");
        //reset notification panel items
        NativeStorage.setItem('storeNotificationsArray', []);
        //user logged out 
        this.isLoggedOut = true;
        this.nav.setRoot(Login);
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