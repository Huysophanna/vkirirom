import { Component, NgZone } from '@angular/core';
import { NavController, Platform, AlertController, Events } from 'ionic-angular';
import { SMS, Toast, Geolocation } from 'ionic-native';
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
<<<<<<< HEAD
import { Services } from '../services/services';
=======
import { Signup } from '../signup/signup';
>>>>>>> 2d91407db487e7ac24fe10f94d7163e1f9cb0b12
import { About } from '../about/about';
import { Storage } from '@ionic/storage';
import { LocationTracker } from '../../providers/location-tracker';
export var Dashboard = (function () {
    function Dashboard(navCtrl, storage, locationTracker, platform, alertCtrl, events, ngZone) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.locationTracker = locationTracker;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.ngZone = ngZone;
        this.membership = Membership;
        // this.events.subscribe('foreground-marketing-notification', data => {
        //   this.Notification = data;
        // });
        // this.events.subscribe('background-marketing-notification', data => {
        //   this.ngZone.run(() => {
        //     this.Notification = data;
        //   });
        //   alert(this.Notification);
        // });
    }
    Dashboard.prototype.navigate = function (num) {
        switch (num) {
            case 1:
                this.navCtrl.push(Services);
                break;
            case 2:
                this.navCtrl.push(Membership);
                break;
            case 3:
                this.navCtrl.push(GoogleMapPage);
                break;
            case 4:
                this.navCtrl.push(Chat);
                break;
            case 5:
                this.navCtrl.push(Signup);
                break;
            case 6:
                this.navCtrl.push(About);
                break;
        }
    };
    Dashboard.prototype.sos = function () {
<<<<<<< HEAD
        console.log("Sending SMS");
        document.addEventListener('deviceready', backgroundPosition, false);
        if (cordova.plugins.backgroundMode.isActive()) {
            alert("Active");
            backgroundPosition();
        }
        else {
            alert("Not Active");
            Geolocation.getCurrentPosition().then(function (resp) {
                var latitude = resp.coords.latitude;
                var longitude = resp.coords.longitude;
                var number = "0962304669";
                var message = "http://maps.google.com/?q=" + latitude + "," + longitude + "";
                var options = {
                    replaceLineBreaks: false,
                    android: {
                        //  intent: 'INTENT'  // Opens Default sms app
                        intent: '' // Sends sms without opening default sms app
                    }
                };
                console.log("ready");
                alert("about to send");
                SMS.send(number, message, options)
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
                alert("Geolocation Error" + Error);
            });
        }
        function backgroundPosition() {
            cordova.plugins.backgroundMode.enable();
            cordova.plugins.backgroundMode.setDefaults({
                title: 'Chain vKirirom',
                text: 'vKirirom is running in the background'
            });
            cordova.plugins.backgroundMode.onactivate();
            cordova.plugins.backgroundMode.onactivate = function () {
                setInterval(function () {
                    Geolocation.getCurrentPosition().then(function (resp) {
                        var latitude = resp.coords.latitude;
                        var longitude = resp.coords.longitude;
                        pass(latitude, longitude);
                    });
                }, 5000);
                function pass(latitude, longitude) {
                    var lat = [];
                    var lng = [];
                    lat.push(latitude);
                    lng.push(longitude);
                    if (lat.length == 10 && lng.length == 10) {
                        lat = [];
                        lng = [];
                    }
                    else if (lat.length == 0 && lng.length == 0) {
                        lat.push(latitude);
                        lng.push(longitude);
                    }
                    else {
                        alert("Ooupp! Something went wrong.");
                    }
                    var number = "0962304669";
                    var message = "http://maps.google.com/?q=" + lat[lat.length - 1] + "," + lng[lng.length - 1] + "";
                    var options = {
                        replaceLineBreaks: false,
                        android: {
                            //  intent: 'INTENT'  // Opens Default sms app
                            intent: '' // Sends sms without opening default sms app
                        }
                    };
                    SMS.send(number, message, options)
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
                }
            };
        }
=======
        var confirmAlert = this.alertCtrl.create({
            title: 'Emergency SOS',
            message: 'We will send a SMS along with your current location to our supports',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel'
                }, {
                    text: 'Confirm',
                    handler: function (data) {
                        console.log("Sending SMS");
                        Geolocation.getCurrentPosition()
                            .then(function (resp) {
                            var lat = resp.coords.latitude;
                            var lng = resp.coords.longitude;
                            var number = "0962304669";
                            var message = "Please Help! I got an emergency problems. This is my location: http://maps.google.com/?q=" + lat + "," + lng + "";
                            var options = {
                                replaceLineBreaks: false,
                                android: {
                                    //  intent: 'INTENT'  // Opens Default sms app
                                    intent: '' // Sends sms without opening default sms app
                                }
                            };
                            SMS.send(number, message).then(function () {
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
                    }
                }]
        });
        confirmAlert.present();
>>>>>>> 2d91407db487e7ac24fe10f94d7163e1f9cb0b12
    };
    Dashboard.prototype.ionViewDidLoad = function () {
        console.log('Hello Dashboard Page');
    };
    Dashboard.decorators = [
        { type: Component, args: [{
                    selector: 'page-dashboard',
                    templateUrl: 'dashboard.html',
                    styles: ['.header-md::after { background-image: none; }']
                },] },
    ];
    /** @nocollapse */
    Dashboard.ctorParameters = [
        { type: NavController, },
        { type: Storage, },
        { type: LocationTracker, },
        { type: Platform, },
        { type: AlertController, },
        { type: Events, },
        { type: NgZone, },
    ];
    return Dashboard;
}());
