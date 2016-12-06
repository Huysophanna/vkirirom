import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from 'ionic-native';
import { Toast } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import { Membership } from '../membership/membership';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { About } from '../about/about';
import { Storage } from '@ionic/storage';
import { Push } from '@ionic/cloud-angular';
import { LocationTracker } from '../../providers/location-tracker';
/*
  Generated class for the Dashboard page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var Dashboard = (function () {
    function Dashboard(navCtrl, storage, push, locationTracker) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.push = push;
        this.locationTracker = locationTracker;
        this.membership = Membership;
        //Push notification configuration
        this.push.register().then(function (t) {
            return _this.push.saveToken(t);
        }).then(function (t) {
            console.log('Token saved:', t.token);
        });
        this.push.rx.notification().subscribe(function (msg) {
            //   this.storage.set('push-notification', msg.text);
            _this.Notification = msg.text;
        });
    }
    Dashboard.prototype.navigate = function (num) {
        switch (num) {
            case 2:
                this.navCtrl.push(Membership);
                break;
            case 3:
                this.navCtrl.push(GoogleMapPage);
                break;
            case 4:
                this.navCtrl.push(Chat);
                break;
            case 6:
                this.navCtrl.push(About);
                break;
        }
    };
    Dashboard.prototype.chat = function () {
        console.log("navigating to chat screen");
        this.navCtrl.push(Chat);
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
                }
            };
            console.log("ready");
            alert("about to send");
            SMS.send(number, message)
                .then(function () {
                alert("Please stay safe. Our team will be there so soon!");
                Toast.show("Please stay safe. Our team will be there so soon!", '5000', 'bottom').subscribe(function (toast) {
                    console.log(toast);
                });
            }, function (error) {
                alert(error);
                Toast.show("You cancelled the action", '5000', 'bottom').subscribe(function (toast) {
                    console.log(toast);
                });
            });
        }, function (Error) {
            console.log("Geolocation error" + Error);
            alert(Error);
            Toast.show("Cannot get your location", '5000', 'bottom').subscribe(function (toast) {
                console.log(toast);
            });
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
        { type: Storage, },
        { type: Push, },
        { type: LocationTracker, },
    ];
    return Dashboard;
}());
