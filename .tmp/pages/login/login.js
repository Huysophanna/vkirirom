import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { Dashboard } from '../dashboard/dashboard';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var Login = (function () {
    function Login(nav, authData, formBuilder, alertCtrl, loadingCtrl) {
        this.nav = nav;
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
        this.authData.logoutUser();
    }
    Login.prototype.ionViewDidLoad = function () {
        console.log('Hello Login Page');
    };
    Login.prototype.loginUser = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(function (authData) {
                _this.nav.setRoot(Dashboard);
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
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
    };
    /**
     * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
     */
    Login.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    Login.decorators = [
        { type: Component, args: [{
                    selector: 'page-login',
                    templateUrl: 'login.html',
                },] },
    ];
    /** @nocollapse */
    Login.ctorParameters = [
        { type: NavController, },
        { type: AuthData, },
        { type: FormBuilder, },
        { type: AlertController, },
        { type: LoadingController, },
    ];
    return Login;
}());
