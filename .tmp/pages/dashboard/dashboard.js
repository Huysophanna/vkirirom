import { Component } from '@angular/core';
import { NavController, Platform, AlertController, Events, ModalController, LoadingController } from 'ionic-angular';
import { SMS, Toast, Geolocation, Network, NativeStorage } from 'ionic-native';
import { Membership } from '../membership/membership';
import { Services } from '../services/services';
import { GoogleMapPage } from '../map/map';
import { Chat } from '../chat/chat';
import { About } from '../about/about';
import { LocationTracker } from '../../providers/location-tracker';
import { Userscope } from '../../providers/userscope';
import { SettingService } from '../../providers/setting-service';
import { Notificationpanel } from '../notificationpanel/notificationpanel';
export var Dashboard = (function () {
<<<<<<< HEAD
    function Dashboard(platform, navCtrl, storage, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl, settingService, events) {
=======
    function Dashboard(platform, navCtrl, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl, settingService, events) {
>>>>>>> 46cf9a6ea5909f17bb82f648b5b1f2c9dc4f78c9
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.locationTracker = locationTracker;
        this.userScope = userScope;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.settingService = settingService;
        this.events = events;
        this.membership = Membership;
        this.isUnknown = false;
        document.addEventListener('deviceready', function () {
            cordova.plugins.backgroundMode.setDefaults({
                title: 'Chain',
                text: 'BackgroundGeolocation'
            });
            cordova.plugins.backgroundMode.onactivate = function () {
                alert("background Mode");
                setInterval(function () {
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
                            else if (JSON.parse(data).length >= 0) {
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
                        }, function (err) {
                            userlocation.push({
                                lat: latitute,
                                lng: longitute
                            });
                            NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(function (data) {
                                console.log("Set user location success :" + data);
                            }, function (err) {
                                console.log("Set user location failed :" + err);
                            });
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
            console.log("My location :" + latitute + longitude);
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
                if ((this.isKirirom == undefined) && (this.isUnknown == false)) {
                    var loader = this.loadingCtrl.create({
                        content: 'Identifying your current location....',
                        duration: 1000
                    });
                    loader.present();
                }
                else if ((this.isKirirom == undefined) && (this.isUnknown == true)) {
                    this.warningAlert("Location failed", "We cannot Identify your current location, Please check your internet connection.");
                }
                else if ((this.isKirirom == false) && (this.isUnknown == false)) {
                    this.warningAlert("Outdoor Mode", "Sorry, this function is not accessible outside kirirom area.");
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
        var _this = this;
        if ((this.isKirirom == undefined) && (this.isUnknown == false)) {
            var loader = this.loadingCtrl.create({
                content: 'Identifying your current location....',
                duration: 1000
            });
            loader.present();
        }
        else if ((this.isKirirom == undefined) && (this.isKirirom == true)) {
            this.warningAlert("Location failed", "We cannot Identify your current location, Please check your internet connection.");
        }
        else if ((this.isKirirom == false) && (this.isUnknown == false)) {
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
                                    Toast.show("Please stay safe. Our team will be there so soon!", '5000', 'bottom').subscribe(function (toast) {
                                        console.log(toast);
                                    });
                                }, function (error) {
                                    Toast.show("You cancelled the action", '5000', 'bottom').subscribe(function (toast) {
                                        console.log(toast);
                                    });
                                });
                            }, function (err) {
<<<<<<< HEAD
                                alert("Get user location from storage failed : " + err);
=======
                                _this.warningAlert("Get user location failed", err);
>>>>>>> 46cf9a6ea5909f17bb82f648b5b1f2c9dc4f78c9
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
    Dashboard.prototype.ionViewDidEnter = function () {
        //get firebase user data from provider, like name, details, bgLocationTag etc
        // setTimeout(() => {
        //   this.firebaseUserData.retrieveUserData();
        // }, 2000);
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
        { type: Platform, },
        { type: NavController, },
        { type: LocationTracker, },
        { type: Userscope, },
        { type: AlertController, },
        { type: ModalController, },
        { type: LoadingController, },
        { type: SettingService, },
        { type: Events, },
    ];
    return Dashboard;
}());
