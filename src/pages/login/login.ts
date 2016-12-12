import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from 'ionic-native';
import firebase from 'firebase';
import { Facebook } from 'ionic-native';
import { AuthData } from '../../providers/auth-data';
import { Dashboard } from '../dashboard/dashboard';
import { KeyboardAttachDirective } from '../../app/keyboard-attach.directive'
import { NativeStorage } from 'ionic-native';

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
  userProfile: any; users: any;

  constructor(public nav: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController, public fb: Facebook) {
      this.userProfile;
       this.loginForm = formBuilder.group({
          email: ['', Validators.compose([Validators.required])],
          password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
       });

       this.authData.logoutUser();
       Facebook.logout();
      
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
      content: 'Authenticating...',
      dismissOnPageChange: true,
    });
      this.loading.present();
    }
  }

  createNewUser() {
    let user = firebase.database().ref('/Users');
    user.child(this.userProfile.uid).set({"name": this.userProfile.displayName , "cardid": "", "email": this.userProfile.email, "vpoint": "", "type": "", "joined": "", "expire": ""});
  }

  userExist() {
    //set database for users
    let user = firebase.database().ref('/Users/'+this.userProfile.uid);
    user.once('value')
    .then((response)=>{
      let existed = response.child('name').exists();
      if(!existed){
        this.createNewUser();
      }
      console.log(existed);
    }).catch((err)=>{
      console.log(err);
      alert(err);
    });
  }

  facebookLogin(){
    console.log("Facebook Login Function");
    
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
          
          //alert("Firebase success: " + JSON.stringify(success));
          this.nav.setRoot(Dashboard);

          //store userProfile object to the phone storage
          NativeStorage.setItem('userDetails', this.userProfile);
          NativeStorage.setItem('userID', response.authResponse.userID);
        })
        .catch((error) => {
          //alert("Firebase failure: " + JSON.stringify(error));
          alert("Cannot sign you in, firebase problem");
      });

    }).catch((error) => { 
      console.log(error); 
      alert("Cannot sign you in, facebook problem");
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
