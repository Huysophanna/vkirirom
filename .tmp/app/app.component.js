import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Api } from '../providers/api';
import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Category } from '../pages/category/category';
export var MyApp = (function () {
    function MyApp(platform, api) {
        var _this = this;
        this.api = api;
        this.rootPage = Dashboard;
        this.isHome = false;
        this.pages = [];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
        //firebase configuration
        firebase.initializeApp({
            apiKey: "AIzaSyDorWd2MGbJbVjHiKvL3jo2F1qe31A6R08",
            authDomain: "vkirirom-809f8.firebaseapp.com",
            databaseURL: "https://vkirirom-809f8.firebaseio.com",
            storageBucket: "vkirirom-809f8.appspot.com",
            messagingSenderId: "82070365426"
        });
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                _this.rootPage = Login;
            }
        });
        api.category().then(function (datas) {
            for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
                var i = datas_1[_i];
                _this.pages.push({
                    title: i.name,
                    id: i.id
                });
            }
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(Category, {
            id: page.id,
            title: page.title
        });
        this.isHome = true;
    };
    MyApp.prototype.openHome = function () {
        //this.nav.setRoot(Page1);
        this.isHome = false;
    };
    MyApp.decorators = [
        { type: Component, args: [{
                    templateUrl: 'app.html'
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = [
        { type: Platform, },
        { type: Api, },
    ];
    MyApp.propDecorators = {
        'nav': [{ type: ViewChild, args: [Nav,] },],
    };
    return MyApp;
}());
