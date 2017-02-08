import { Component } from '@angular/core';
import { MenuController, NavController, Platform, LoadingController, AlertController, Events } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import { Facebook, Keyboard, NativeStorage } from 'ionic-native';
import { AuthData } from '../../providers/auth-data';
import { Dashboard } from '../dashboard/dashboard';
import { Resetpw } from '../resetpw/resetpw';
import { Signup } from '../signup/signup';
import { KeyboardAttachDirective } from '../../app/keyboard-attach.directive';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles: ['.header-md::after { background-image: none; }'],

})
export class Login {
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  userProfile: any; users: any;
  hideMenuToggle: boolean;
  deviceToken: any;

  constructor(public menuCtrl: MenuController, public platform: Platform, public nav: NavController, public authData: AuthData,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public fb: Facebook, public events: Events) {
    Keyboard.disableScroll(true);
    this.userProfile;
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    NativeStorage.getItem('deviceToken').then(data => {
        this.deviceToken = data;
    }); 

    this.authData.logoutUser();
    Facebook.logout();

  }

  loginUser() {
    this.submitAttempt = true;
    this.platform.ready().then(() => {

      if (!this.loginForm.valid) {
        console.log(this.loginForm.value);
      } else {
        this.loading = this.loadingCtrl.create({
          content: 'Authenticating...',
          dismissOnPageChange: true,
        });
        this.loading.present();
        this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
          // alert(JSON.stringify(authData));
          //store userProfile object to the phone storage
          this.userProfile = authData;

          //store user device token and other details to firebase after creating the user account
          this.storeDeviceTokenToFirebase();

          NativeStorage.setItem('userDetails', this.userProfile);
          NativeStorage.setItem('userPhoto', this.userProfile.photoURL).then(() => {
            this.events.publish('UserLogin', authData.displayName);
          });
          this.nav.setRoot(Dashboard);
        }, error => {
          this.loading.dismiss().then(() => {
            this.warningAlert(JSON.stringify(error));
          });
        });
      }
    });

  }

  signUpUser() {
    this.nav.push(Signup);
  }

  resetPassword() {
    this.nav.push(Resetpw);
  }

  createNewUser() {
    let user = firebase.database().ref('/Users');
    user.child(this.userProfile.uid).set({ "name": this.userProfile.displayName, "cardid": "", "email": this.userProfile.email, "vpoint": "", "type": "", "joined": "", "expire": "", "location": "", "platform": "", "deviceToken": "", "group": "default" });
  }

  userExist() {
    //set database for users
    let user = firebase.database().ref('/Users/' + this.userProfile.uid);
    user.once('value')
      .then((response) => {
        let existed = response.child('name').exists();
        if (!existed) {
          this.createNewUser();
        }
        console.log(existed);
      }).catch((err) => {
        console.log(err);
        this.warningAlert(err + ". Please contact customer support.")
      });
  }

  facebookLogin() {
    console.log("Facebook Login Function");

    this.platform.ready().then(() => {
      Facebook.login(['email']).then((response) => {
        //alert("Logged in");
        //alert(JSON.stringify(response.authResponse));

        let facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
        this.loading = this.loadingCtrl.create({
          content: 'Authenticating...',
          dismissOnPageChange: true,
        });
        this.loading.present();
        firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
            this.userProfile = success;
            this.userExist();
            //store user device token and other details to firebase after creating the user account
            this.storeDeviceTokenToFirebase();
            //alert("Firebase success: " + JSON.stringify(success));
            this.nav.setRoot(Dashboard);

            //store userProfile object to the phone storage
            NativeStorage.setItem('userDetails', this.userProfile);
            // NativeStorage.setItem('userID', response.authResponse.userID);
            NativeStorage.setItem('userPhoto', this.userProfile.photoURL).then(() => {
              //"https://graph.facebook.com/" + response.authResponse.userID + "/picture?width=320&height=320"
              //create an event for others to listen
              this.events.publish('UserLogin', success.displayName);
            });
          })
          .catch((error) => {
            //alert("Firebase failure: " + JSON.stringify(error));
            this.warningAlert(error + ". Please contact Customer Service for this issue.");
          });

      }).catch((error) => {
        console.log(error);
        if (error.statusCode != 4201) {
          this.warningAlert("Can't connect to Facebook. Please check your network connection.");
        }
        alert(JSON.stringify(error));
      });
    });

  }

  storeDeviceTokenToFirebase() {
    let user = firebase.database().ref('/Users/' + this.userProfile.uid);
    user.update({"deviceToken": this.deviceToken}).then(success => {
      alert(success);
    });
  }

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  warningAlert(message) {
    this.alertCtrl.create({
      message: message,
      buttons: [{
        text: "Ok",
        role: 'cancel'
      }]
    }).present();
  }

  ionViewDidEnter() {
    //hide side mneu on login screen
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    //show side menu if it's not login screen
    this.menuCtrl.enable(true);
  }

}
