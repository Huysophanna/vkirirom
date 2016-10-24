import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
export declare class Login {
    nav: NavController;
    authData: AuthData;
    formBuilder: FormBuilder;
    alertCtrl: AlertController;
    loadingCtrl: LoadingController;
    loginForm: any;
    emailChanged: boolean;
    passwordChanged: boolean;
    submitAttempt: boolean;
    loading: any;
    constructor(nav: NavController, authData: AuthData, formBuilder: FormBuilder, alertCtrl: AlertController, loadingCtrl: LoadingController);
    ionViewDidLoad(): void;
    loginUser(): void;
    /**
     * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
     */
    elementChanged(input: any): void;
}
