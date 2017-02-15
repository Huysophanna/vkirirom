import { Component } from '@angular/core';
import { NavController, Platform, AlertController, Events, ModalController, LoadingController } from 'ionic-angular';
import { SMS, Toast, Geolocation, NativeStorage, Diagnostic } from 'ionic-native';
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
    function Dashboard(platform, navCtrl, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl, settingService, events) {
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
        this.launchCount = 0;
        platform.ready().then(function () {
            alert("Testing purpose only : " + Diagnostic.locationMode.LOCATION_OFF);
            _this.launchCount = _this.launchCount + 1;
            NativeStorage.getItem('launchCount').then(function (data) {
                data = data + 1;
                NativeStorage.setItem('launchCount', data).then(function (data) {
                    console.log("Set launchCount success " + data);
                }, function (err) {
                    console.error("Set launchCount error : " + err);
                });
            }, function (err) {
                NativeStorage.setItem('launchCount', _this.launchCount).then(function (data) {
                    console.log("Set launchCount success in err " + data);
                }, function (err) {
                    console.error("Set launchCount error in err : " + err);
                });
            });
            _this.diagnosticFunction();
        });
    }
    Dashboard.prototype.diagnosticFunction = function () {
        var _this = this;
        Diagnostic.isLocationEnabled().then(function (enabled) {
            alert("Location Service is :" + (enabled ? "Enabled" : "Disabled"));
            if (enabled) {
                _this.geolocationFunction();
            }
            else {
                NativeStorage.getItem('launchCount').then(function (data) {
                    if (data === 1) {
                        setTimeout(function () {
                            var confirm = _this.alertCtrl.create({
                                title: 'Your location service is turned off',
                                message: 'Enable to continue using the application, you can disable in setting.',
                                buttons: [
                                    {
                                        text: 'Disagree',
                                        handler: function () {
                                            console.log('Disagree clicked');
                                        }
                                    },
                                    {
                                        text: 'Agree',
                                        handler: function () {
                                            Diagnostic.switchToLocationSettings();
                                            _this.geolocationFunction();
                                        }
                                    }
                                ]
                            });
                            confirm.present();
                        }, 500);
                    }
                    else {
                        console.log("Not the first launch");
                        return;
                    }
                }, function (err) {
                    console.error("Get launchCount error : " + err);
                });
            }
        }).catch(function (e) { return alert("Get Location Service Error : " + e); });
    };
    Dashboard.prototype.geolocationFunction = function () {
        var _this = this;
        Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(function (resp) {
            alert("In Geolocation Dashboard");
            var latitute = resp.coords.latitude;
            var longitute = resp.coords.longitude;
            document.addEventListener('deviceready', function () {
                cordova.plugins.backgroundMode.setDefaults({
                    title: 'Chain',
                    text: 'BackgroundGeolocation'
                });
                cordova.plugins.backgroundMode.onactivate = function () {
                    alert("background Mode");
                    setInterval(function () {
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
                    }, 2000);
                };
            }, false);
            _this.locationTracker.lastLocationTracker(latitute, longitute);
            setInterval(function () {
                _this.kiriromScope(latitute, longitute);
            }, 2000);
        }, function (err) {
            console.log("Geolocation Error :" + _this.isKirirom);
            _this.isUnknown = true;
        });
    };
    Dashboard.prototype.showNoti = function () {
        var notiModal = this.modalCtrl.create(Notificationpanel);
        notiModal.present();
    };
    Dashboard.prototype.kiriromScope = function (latitute, longitute) {
        // alert("kiriromScope :" + latitute + longitute);
        var distance = this.userScope.distanceCal(latitute, longitute);
        if (distance < 1) {
            var test = distance * 1000;
            this.isKirirom = true;
        }
        else {
            if (distance <= 17) {
                this.isKirirom = true;
            }
            else {
                this.isKirirom = false;
            }
        }
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
                                _this.warningAlert("Get user location from storage failed", err);
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
    // checkNetworkConnection() {
    //   if ((<string> Network.connection === 'none')) {
    //       this.connectionStatus = false;
    //       this.isKirirom = false;
    //   } else {
    //       this.connectionStatus = true;
    //   }
    // }
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
