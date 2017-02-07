import { Component } from '@angular/core';
import { NavController, AlertController, Events, ModalController, LoadingController } from 'ionic-angular';
import { NativeStorage, SMS, Toast, Geolocation, Network } from 'ionic-native';
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { About } from '../about/about';
import { Storage } from '@ionic/storage';
import { LocationTracker } from '../../providers/location-tracker';
import { Userscope } from '../../providers/userscope';
import { Notificationpanel } from '../notificationpanel/notificationpanel';
export var Dashboard = (function () {
    function Dashboard(events, navCtrl, storage, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl) {
        var _this = this;
        this.events = events;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.locationTracker = locationTracker;
        this.userScope = userScope;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.membership = Membership;
        this.isUnknown = false;
        setInterval(function () {
            _this.checkNetworkConnection();
            _this.kiriromScope();
        }, 2000);
        NativeStorage.getItem('deviceToken').then(function (data) {
            _this.deviceToken = data;
        });
    }
    Dashboard.prototype.showNoti = function () {
        var notiModal = this.modalCtrl.create(Notificationpanel);
        notiModal.present();
    };
    Dashboard.prototype.kiriromScope = function () {
        var _this = this;
        Geolocation.getCurrentPosition().then(function (resp) {
            var latitute = resp.coords.latitude;
            var longitude = resp.coords.longitude;
            var distance = _this.userScope.distanceCal(latitute, longitude);
            if (distance < 1) {
                var test = distance * 1000;
                _this.isKirirom = true;
            }
            else {
                if (distance <= 17) {
                    _this.isKirirom = true;
                }
                else {
                    _this.isKirirom = false;
                }
            }
        }, function (Error) {
            console.log("Geolocation Error :" + _this.isKirirom);
            _this.isUnknown = true;
        });
    };
    Dashboard.prototype.navigate = function (num) {
        switch (num) {
            case 1:
                this.navCtrl.push(Services);
                break;
            case 2:
                this.warningAlert("Coming Soon!", "Introducing vKirirom Membership Card with vPoints, will be available soon.");
                // this.navCtrl.push(Membership);
                break;
            case 3:
                this.navCtrl.push(GoogleMapPage);
                break;
            case 4:
                if (this.isKirirom == false) {
                    this.warningAlert("Outdoor Mode", "This function is not accessible from outside vKirirom area.");
                }
                else {
                    this.navCtrl.push(Chat);
                }
                break;
            case 5:
                this.warningAlert("Coming Soon!", "Introducing vKirirom Media, will be available soon.");
                break;
            case 6:
                this.navCtrl.push(About);
                break;
        }
    };
    Dashboard.prototype.sos = function () {
        if (this.isKirirom == false) {
            this.warningAlert("Outdoor Mode", "This function is not accessible from outside vKirirom area.");
        }
        else {
            var confirmAlert = this.alertCtrl.create({
                title: 'Emergency SOS',
                message: 'We will send a SMS along with your current location to our supports',
                buttons: [{
                        text: 'Cancel',
                        role: 'cancel'
                    }, {
                        text: 'Confirm',
                        handler: function (data) {
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
                        }
                    }]
            });
            confirmAlert.present();
        }
    };
    Dashboard.prototype.warningAlert = function (title, message) {
        this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [{
                    text: 'Okay',
                    role: 'cancel'
                }]
        }).present();
    };
    Dashboard.prototype.checkNetworkConnection = function () {
        if ((Network.connection === 'none')) {
            this.connectionStatus = false;
            this.isKirirom = false;
        }
        else {
            this.connectionStatus = true;
        }
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
        { type: Events, },
        { type: NavController, },
        { type: Storage, },
        { type: LocationTracker, },
        { type: Userscope, },
        { type: AlertController, },
        { type: ModalController, },
        { type: LoadingController, },
    ];
    return Dashboard;
}());
