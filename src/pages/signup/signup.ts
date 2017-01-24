import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { Dashboard } from '../dashboard/dashboard';
import firebase from 'firebase';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {

  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;


  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
      

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
        this.nav.setRoot(Dashboard);
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
    alert(signUpData.uid);
    alert(JSON.stringify(signUpData));
    user.child(signUpData.uid).set({"name": this.signupForm.name , "cardid": "", "email": this.signupForm.email, "vpoint": "", "type": "", "joined": "", "expire": ""});
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
