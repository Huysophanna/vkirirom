import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from 'ionic-native';
import firebase from 'firebase';
import { Facebook } from 'ionic-native';
import { AuthData } from '../../providers/auth-data';
import { Dashboard } from '../dashboard/dashboard';
import { KeyboardAttachDirective } from '../../app/keyboard-attach.directive'
import { Storage } from '@ionic/storage';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  userProfile: any;

  constructor(public nav: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController, public fb: Facebook, public storage: Storage) {
      this.userProfile;
       this.loginForm = formBuilder.group({
          email: ['', Validators.compose([Validators.required])],
          password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
       });

       this.authData.logoutUser();
      
  }

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  loginUser() {
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.nav.setRoot(Dashboard);
      }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
     });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
      this.loading.present();
    }
  }

  facebookLogin(){
    console.log("Facebook Login Function");
    
    Facebook.login(['email']).then((response) => {
      //alert("Logged in");
      //alert(JSON.stringify(response.authResponse));

      let facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          //alert("Firebase success: " + JSON.stringify(success));
          this.userProfile = success;
          this.nav.setRoot(Dashboard);

          //store userProfile object to the phone storage
          this.storage.set('userProfile', this.userProfile);
        })
        .catch((error) => {
          //alert("Firebase failure: " + JSON.stringify(error));
      });

    }).catch((error) => { 
      console.log(error); 
    });    
  }

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

}
