import { Component } from '@angular/core';
import { Events, NavController, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Toast, Keyboard, NativeStorage } from 'ionic-native';
import { AuthData } from '../../providers/auth-data';
import firebase from 'firebase';

/*
  Generated class for the Editprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
  // styles: ['.scroll-content { overflow-y: auto }']
})
export class Editprofile {

 public editForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  nameChanged: boolean = false;
  passwordConfirmChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  currentUser: any;
  credential: any;

  constructor(public viewCtrl: ViewController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public events: Events) {
      
      //get the current signed in user
      this.currentUser = firebase.auth().currentUser;

      Keyboard.disableScroll(true);
      this.editForm = formBuilder.group({
        name: [this.currentUser.displayName, Validators.compose([Validators.required, Validators.minLength(5)])],
        email: [this.currentUser.email, Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

  }

  ionViewDidLoad() {
    console.log('Hello Editprofile Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

   //  * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
  //  */
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  editConfirmPressed() {
    this.loading = this.loadingCtrl.create({
        content: "Working",
        dismissOnPageChange: true,
    });
    this.loading.present();

    //Facebook credential
    // credential = FacebookAuthProvider.getCredential(AccessToken.getCurrentAccessToken().toString())

    this.credential = firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email, 
        this.editForm.value.password
    );
    //reauthenticate the user in order to make changes to the details
    this.currentUser.reauthenticate(this.credential).then(() => {
      // User re-authenticated.
      this.currentUser.updateEmail(this.editForm.value.email).then(() => {
        //success updating email
        this.currentUser.updateProfile({
          displayName: this.editForm.value.name
        }).then(success => {
          //success updating username
            NativeStorage.setItem('userDetails', this.currentUser).then(() => {
              this.loading.dismiss().then(success => {
                this.events.publish('UserLogin', this.currentUser.displayName);
                this.makeToast("Success! Your details are now updated.");
                this.dismiss();
              });
            });
        });
      }, _error => {
        this.loading.dismiss().then(success => {
          this.makeToast(_error.message);
        });
      });
      
      
    }, error => {
        this.loading.dismiss().then(success => {
          this.makeToast("Failed! We could not authenticate user. Your current password provided might be wrong or the connection could not be established.");
        });
    });
  }

  warningAlert(title, message) {
    this.alertCtrl.create( {
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

}
