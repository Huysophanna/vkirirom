import { Component } from '@angular/core';
import { Platform, MenuController, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { Dashboard } from '../dashboard/dashboard';
import { Login } from '../login/login';
import firebase from 'firebase';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styles: ['.header-md::after { background-image: none;} .vtop-bar { height: 20%; };']
})
export class Signup {

  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  nameChanged: boolean = false;
  passwordConfirmChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;


  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public menuCtrl: MenuController, public platform: Platform) {

    Keyboard.disableScroll(true);
    this.signupForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      passwordConfirm: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
    
  }



  signupUser(){
    this.submitAttempt = true;
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else if (this.signupForm.value.password != this.signupForm.value.passwordConfirm) {
      this.warningAlert("Your passwords are not matched.");
      
    }  else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then((signUpData) => {
        //set user details into firebase user profile
        signUpData.updateProfile({
          displayName: this.signupForm.value.name,
          photoURL: "img/man.svg"
        });
        this.nav.setRoot(Login);
        this.warningAlert("Success! You can now proceed logging in to your new account.");
        //store user data into firebase database
        this.createNewUser(signUpData);
      }, (error) => {
        this.loading.dismiss();
        this.warningAlert(error.message);
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  //  * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
  //  */
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  createNewUser(signUpData) {
    let user = firebase.database().ref('/Users');
    user.child(signUpData.uid).set({ "name": signUpData.displayName, "cardid": "", "email": signUpData.email, "vpoint": "", "type": "", "joined": "", "expire": "", "location": "", "platform": "", "deviceToken": "", "group": "default", "bgLocationTag": true });
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