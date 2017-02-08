import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController, Platform, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { SMS, Toast, Geolocation, Network, NativeStorage } from 'ionic-native';
=======
import { NavController, AlertController, Events, ModalController, LoadingController } from 'ionic-angular';
<<<<<<< HEAD
import { NativeStorage, SMS, Toast, Geolocation, Network } from 'ionic-native';
=======
import { SMS, Toast, Geolocation, Network } from 'ionic-native';
>>>>>>> bc0bed54c85b05159ea702e9fba2e7f5b3464e99
>>>>>>> 9acb07410c709512e67af579b5e0e7d3b44f18af
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { About } from '../about/about';
import { Storage } from '@ionic/storage';
import { LocationTracker } from '../../providers/location-tracker';
import { Userscope } from '../../providers/userscope';
<<<<<<< HEAD
import { SettingService } from '../../providers/setting-service';
=======
<<<<<<< HEAD
import { Notificationpanel } from '../notificationpanel/notificationpanel';
export var Dashboard = (function () {
    function Dashboard(events, navCtrl, storage, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl) {
=======
>>>>>>> 9acb07410c709512e67af579b5e0e7d3b44f18af
import { Modal } from '../modal/modal';
export var Dashboard = (function () {
<<<<<<< HEAD
    function Dashboard(platform, navCtrl, storage, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl, settingService) {
        var _this = this;
        this.platform = platform;
=======
    function Dashboard(navCtrl, storage, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl, event) {
>>>>>>> bc0bed54c85b05159ea702e9fba2e7f5b3464e99
        var _this = this;
        this.events = events;
>>>>>>> 9acb07410c709512e67af579b5e0e7d3b44f18af
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.locationTracker = locationTracker;
        this.userScope = userScope;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.settingService = settingService;
        this.membership = Membership;
        this.isUnknown = false;
        NativeStorage.getItem('location').then(function (data) {
            var parseData = JSON.parse(data);
            var loc = parseData[parseData.length - 1];
            alert("user location :" + loc);
        }, function (error) {
            alert("NativeStorage error :" + error);
        });
        // if (this.settingService.isLocation == true) {
        //   alert("background user location true");
        // } else {
        //   alert("background user location false");
        // }
        document.addEventListener('deviceready', function () {
            cordova.plugins.backgroundMode.setDefaults({
                title: 'TheTitleOfYourProcess',
                text: 'Executing background tasks.'
            });
            cordova.plugins.backgroundMode.enable();
            cordova.plugins.backgroundMode.onactivate = function () {
                var _this = this;
                setInterval(function () {
                    alert("backgroundMode");
                    Geolocation.getCurrentPosition().then(function (resp) {
                        var latitute = resp.coords.latitude;
                        var longitute = resp.coords.longitude;
                        var userlocation = [];
                        NativeStorage.getItem('userlocation').then(function (data) {
                            if (JSON.parse(data).length == 5) {
                                userlocation = [];
                                NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(function (data) {
                                    console.log("Set user location success :" + data);
                                }, function (err) {
                                    console.log("Set userlocation failed :" + err);
                                });
                            }
                            else if (_this.userlocation.length >= 0) {
                                userlocation.push({
                                    lat: latitute,
                                    lng: longitute
                                });
                                NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(function (data) {
                                    console.log("Set user location success :" + data);
                                }, function (err) {
                                    console.log("Set userlocation failed :" + err);
                                });
                            }
                            else {
                                console.log("Oupp something went wrong!!!");
                            }
                        });
                    });
                }, 2000);
            };
        }, false);
        this.locationTracker.lastLocationTracker();
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
<<<<<<< HEAD
            console.log("My location :" + latitute + longitude);
=======
<<<<<<< HEAD
=======
            console.log("My location :" + latitute + " " + longitude);
>>>>>>> bc0bed54c85b05159ea702e9fba2e7f5b3464e99
>>>>>>> 9acb07410c709512e67af579b5e0e7d3b44f18af
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
                if (this.isKirirom === undefined) {
                    var loader = this.loadingCtrl.create({
                        content: 'Identifying your current location....',
                        duration: 1000
                    });
                    loader.present();
                }
                else {
                    if (this.isKirirom == false) {
                        this.warningAlert("Outdoor Mode", "This function is not accessible from outside vKirirom area.");
                    }
                    else {
                        this.navCtrl.push(Chat);
                    }
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
        var _this = this;
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
                            NativeStorage.getItem('userlocation').then(function (data) {
                                var parseUserlocation = JSON.parse(data);
                                _this.lastLat = parseUserlocation[parseUserlocation.length - 1].lat;
                                _this.lastLng = parseUserlocation[parseUserlocation.length - 1].lng;
                                var number = "0962304669";
                                var message = "http://maps.google.com/?q=" + _this.lastLat + "," + _this.lastLng + "";
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
                            }, function (err) {
                                alert("Get user location failed : " + err);
                            });
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
<<<<<<< HEAD
        { type: Platform, },
=======
        { type: Events, },
>>>>>>> 9acb07410c709512e67af579b5e0e7d3b44f18af
        { type: NavController, },
        { type: Storage, },
        { type: LocationTracker, },
        { type: Userscope, },
        { type: AlertController, },
        { type: ModalController, },
        { type: LoadingController, },
        { type: SettingService, },
    ];
    return Dashboard;
}());
