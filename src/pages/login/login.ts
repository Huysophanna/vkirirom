import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController  } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from 'ionic-native';
import { AuthData } from '../../providers/auth-data';
import { Dashboard } from '../dashboard/dashboard';

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

  constructor(public nav: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController) {
       this.loginForm = formBuilder.group({
          email: ['', Validators.compose([Validators.required])],
          password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
       });
      
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

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

}
