import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { AuthData } from '../providers/auth-data';
import { Storage } from '@ionic/storage';
export var MyApp = (function () {
    function MyApp(platform, loadingCtrl, storage) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.rootPage = Dashboard;
        this.isHome = false;
        this.pages = [];
        this.authData = AuthData;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
        // set our app's pages
        this.pages = [
            { title: 'Setting', component: Dashboard },
            { title: 'About', component: Dashboard },
            { title: 'Contact Us', component: Dashboard },
            { title: 'Log Out', id: 4 }
        ];
        //firebase configuration
        firebase.initializeApp({
            apiKey: "AIzaSyDorWd2MGbJbVjHiKvL3jo2F1qe31A6R08",
            authDomain: "vkirirom-809f8.firebaseapp.com",
            databaseURL: "https://vkirirom-809f8.firebaseio.com",
            storageBucket: "vkirirom-809f8.appspot.com",
            messagingSenderId: "82070365426"
        });
        firebase.auth().onAuthStateChanged(function (user) {
            _this.loading = _this.loadingCtrl.create({
                dismissOnPageChange: true,
            });
            if (!user) {
                _this.loading.present();
                _this.loading.dismiss();
                _this.rootPage = Login;
            }
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        //logout function
        if (page.id == 4) {
            //store userProfile object to the phone storage
            this.storage.set('userProfile', "");
            this.nav.setRoot(Login);
            console.log(page.title);
        }
    };
    MyApp.prototype.openHome = function () {
        //this.nav.setRoot(Page1);
        this.isHome = false;
    };
    MyApp.decorators = [
        { type: Component, args: [{
                    templateUrl: 'app.html',
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = [
        { type: Platform, },
        { type: LoadingController, },
        { type: Storage, },
    ];
    MyApp.propDecorators = {
        'nav': [{ type: ViewChild, args: [Nav,] },],
    };
    return MyApp;
}());
