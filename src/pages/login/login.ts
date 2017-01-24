import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController, Events } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import { Facebook, Keyboard, NativeStorage } from 'ionic-native';
import { AuthData } from '../../providers/auth-data';
import { Dashboard } from '../dashboard/dashboard';
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

  constructor(public platform: Platform, public nav: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController, public fb: Facebook, public events: Events) {
      Keyboard.disableScroll(true);
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
    this.platform.ready().then(()=> {
        
      if (!this.loginForm.valid){
        console.log(this.loginForm.value);
      } else {
        this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
          // alert(JSON.stringify(authData));
          //store userProfile object to the phone storage
          this.userProfile = authData;
              NativeStorage.setItem('userDetails', this.userProfile).then(()=> {
                this.events.publish('UserLogin', authData.displayName);
              });
          this.nav.setRoot(Dashboard);
        }, error => {
        this.loading.dismiss().then( () => {
          this.warningAlert(JSON.stringify(error));
        });
      });

      this.loading = this.loadingCtrl.create({
        content: 'Authenticating...',
        dismissOnPageChange: true,
      });
        this.loading.present();
      }
    });

  }

  signUpUser() {
    this.nav.push(Signup);
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
      this.warningAlert(err + ". Please contact customer support.")
    });
  }

  facebookLogin(){
    console.log("Facebook Login Function");

    this.platform.ready().then(()=> {
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
              // NativeStorage.setItem('userID', response.authResponse.userID);
              NativeStorage.setItem('userPhoto', "https://graph.facebook.com/" + response.authResponse.userID + "/picture?width=320&height=320").then(() => {
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

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input){
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

}
