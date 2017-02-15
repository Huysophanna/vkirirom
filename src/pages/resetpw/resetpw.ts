import { Component } from '@angular/core';
import { Platform, MenuController, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { Dashboard } from '../dashboard/dashboard';
import { Login } from '../login/login';
import firebase from 'firebase';

@Component({
  selector: 'page-resetpw',
  templateUrl: 'resetpw.html',
  styles: ['.header-md::after { background-image: none;} .page-label { margin-top: 14%; }']
})
export class Resetpw {
  public resetForm;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public menuCtrl: MenuController, public platform: Platform) {

    Keyboard.disableScroll(true);
    this.resetForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
    
  }

  resetPassword(){
    this.submitAttempt = true;
    if (!this.resetForm.valid){
      console.log(this.resetForm.value);
    } else {
      this.loading = this.loadingCtrl.create({
          content: "Working on it",
          dismissOnPageChange: true
      });
      this.loading.present();
      // this.loading.dismiss();
      this.authData.resetPassword(this.resetForm.value.email).then((user) => {
      this.loading.dismiss();
          this.warningAlert("Success! We just sent you a reset link to your email address.");
      }, (error) => {
          this.warningAlert(error.message);
      });
    }
  }
  

  //  * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
  //  */
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