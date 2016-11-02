import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Facebook } from 'ionic-native';
import { AuthData } from '../../providers/auth-data';
import { Storage } from '@ionic/storage';
export declare class Login {
    nav: NavController;
    authData: AuthData;
    formBuilder: FormBuilder;
    alertCtrl: AlertController;
    loadingCtrl: LoadingController;
    fb: Facebook;
    storage: Storage;
    loginForm: any;
    emailChanged: boolean;
    passwordChanged: boolean;
    submitAttempt: boolean;
    loading: any;
    userProfile: any;
    constructor(nav: NavController, authData: AuthData, formBuilder: FormBuilder, alertCtrl: AlertController, loadingCtrl: LoadingController, fb: Facebook, storage: Storage);
    ionViewDidLoad(): void;
    loginUser(): void;
    facebookLogin(): void;
    /**
     * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
     */
    elementChanged(input: any): void;
}
