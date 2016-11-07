import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from 'ionic-native';
import { Toast } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import { Membership } from '../membership/membership';
/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var Dashboard = (function () {
    function Dashboard(navCtrl) {
        this.navCtrl = navCtrl;
        this.membership = Membership;
    }
    Dashboard.prototype.navigate = function () {
        console.log("function is calling");
        this.navCtrl.push(Membership);
    };
    Dashboard.prototype.sos = function () {
        console.log("Sending SMS");
        Geolocation.getCurrentPosition()
            .then(function (resp) {
            var lat = resp.coords.latitude;
            var lng = resp.coords.longitude;
            console.log(lat);
            console.log(lng);
            var number = "0962304669";
            var message = "http://maps.google.com/?q=" + lat + "," + lng + "";
            console.log(message);
            var options = {
                replaceLineBreaks: false,
                android: {
                    //  intent: 'INTENT'  // Opens Default sms app
                    intent: '' // Sends sms without opening default sms app
                },
                ios: {
                    //  intent: 'INTENT'  // Opens Default sms app
                    intent: '' // Sends sms without opening default sms app
                }
            };
            console.log("ready");
            SMS.send(number, message, options)
                .then(function () {
                alert("success");
                Toast.show("Success", '5000', 'bottom').subscribe(function (toast) {
                    console.log(toast);
                });
            }, function () {
                alert("Error");
                Toast.show("Error", '5000', 'bottom').subscribe(function (toast) {
                    console.log(toast);
                });
            });
        }, function (Error) {
            console.log("Geolocation error" + Error);
            alert("error");
        });
    };
    Dashboard.prototype.ionViewDidLoad = function () {
        console.log('Hello Dashboard Page');
    };
    Dashboard.decorators = [
        { type: Component, args: [{
                    selector: 'page-dashboard',
                    templateUrl: 'dashboard.html'
                },] },
    ];
    /** @nocollapse */
    Dashboard.ctorParameters = [
        { type: NavController, },
    ];
    return Dashboard;
}());
