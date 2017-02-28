import { Component, NgZone } from '@angular/core';
import { BackgroundMode, SMS, Toast, Geolocation, NativeStorage, Diagnostic } from 'ionic-native';
import { MenuController, NavController, Platform, AlertController, Events, ModalController, LoadingController } from 'ionic-angular';
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
    function Dashboard(platform, navCtrl, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl, settingService, events, menuCtrl, ngZone) {
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
        this.menuCtrl = menuCtrl;
        this.ngZone = ngZone;
        this.membership = Membership;
        this.isUnknown = false;
        this.launchCount = 0;
        this.isLocationEnable = true;
        platform.ready().then(function () {
            //show side menu if it's not login screen
            menuCtrl.enable(true);
            setInterval(function () {
                _this.fetchUserGeoLocation();
            });
            // this.fetchUserGeoLocation();
            BackgroundMode.ondeactivate().subscribe(function () {
                // this.fetchUserGeoLocation();
                setInterval(function () {
                    _this.fetchUserGeoLocation();
                });
                // alert('deactivated');
            });
        });
    }
    Dashboard.prototype.showNoti = function () {
        var notiModal = this.modalCtrl.create(Notificationpanel);
        notiModal.present();
    };
    Dashboard.prototype.kiriromScope = function (latitute, longitute) {
        var _this = this;
        this.ngZone.run(function () {
            var distance = _this.userScope.distanceCal(latitute, longitute);
            if (distance < 1) {
                var test = distance * 1000;
                _this.isKirirom = true;
                _this.isUnknown = false;
                _this.events.publish('isKirirom', _this.isKirirom);
            }
            else {
                if (distance <= 17) {
                    _this.isKirirom = true;
                    _this.isUnknown = false;
                    _this.events.publish('isKirirom', _this.isKirirom);
                }
                else {
                    _this.isKirirom = false;
                    _this.isUnknown = false;
                    _this.events.publish('isKirirom', _this.isKirirom);
                }
            }
            // alert("isGeolocation : " + geolocation);
            // if (geolocation == true) {
            //   this.events.publish('isGeolocation', geolocation);
            // }
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
                if ((this.isKirirom == undefined) && (this.isUnknown == false) && (this.isLocationEnable == true)) {
                    var loader = this.loadingCtrl.create({
                        content: 'Identifying your current location....',
                        duration: 1000
                    });
                    loader.present();
                }
                else if ((this.isKirirom == undefined) && (this.isUnknown == true)) {
                    if (this.locationPermissionDenied) {
                        //if the location is denied or turn off by user
                        this.permissionDeniedWarning();
                    }
                    else if (this.getUserLocation == false) {
                        //can't get location 
                        this.makeToast('There a problem getting your current location. Please allow the internet connectivity or relaunch the app and try again.');
                    }
                    else {
                        this.warningAlert("Location failed", 'There is a problem getting your current location. Please try relaunch the app.');
                    }
                }
                else if ((this.isKirirom == false) && (this.isUnknown == false)) {
                    this.warningAlert("OffSite Mode", "This function is not accessible outside kirirom area.");
                }
                else if (this.isLocationEnable == false) {
                    if (this.platform.is('ios')) {
                        this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services");
                    }
                    else {
                        this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location");
                    }
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
    Dashboard.prototype.fetchUserGeoLocation = function () {
        var _this = this;
        var successCallback = function (isEnabled) {
            // alert('Is available? ' + isEnabled);
            if (isEnabled) {
                _this.isLocationEnable = true;
                Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(function (resp) {
                    _this.isUnknown = false;
                    var latitute = resp.coords.latitude;
                    var longitute = resp.coords.longitude;
                    BackgroundMode.enable();
                    BackgroundMode.setDefaults({
                        title: 'vKapp by Chain Solution',
                        ticker: 'vKapp is now running in the background',
                        text: 'vKapp is tracking your location...',
                        resume: false
                    });
                    BackgroundMode.onactivate().subscribe(function () {
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
                    }, function (err) { return console.error(err); });
                    _this.locationTracker.lastLocationTracker(latitute, longitute);
                    // alert(latitute + "  " + longitute);
                    _this.kiriromScope(latitute, longitute);
                }, function (err) {
                    switch (err.code) {
                        //check
                        case err.PERMISSION_DENIED:
                            _this.locationPermissionDenied = true;
                            break;
                        case err.POSITION_UNAVAILABLE:
                            _this.getUserLocation = false;
                            break;
                        case err.TIMEOUT:
                            _this.makeToast('There is a problem getting your current location. Please try relaunch the app.');
                            break;
                        case err.UNKNOWN_ERROR:
                            _this.makeToast('There is a problem getting your current location. Please try relaunch the app.');
                            break;
                    }
                    _this.isUnknown = true;
                });
            }
            else {
                _this.isLocationEnable = false;
            }
        };
        var errorCallback = function (e) { return alert(e); };
        Diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
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
        else if ((this.isKirirom == undefined) && (this.isUnknown == true) && (this.isLocationEnable == true)) {
            if (this.locationPermissionDenied) {
                //if the location is denied or turn off by user
                this.permissionDeniedWarning();
            }
            else if (this.getUserLocation == false) {
                //can't get location 
                this.makeToast('There a problem getting your current location. Please allow the internet connectivity or relaunch the app and try again.');
            }
            else {
                this.warningAlert("Location failed", 'There is a problem getting your current location. Please try relaunch the app.');
            }
        }
        else if ((this.isKirirom == false) && (this.isUnknown == false)) {
            this.warningAlert("Outdoor Mode", "This function is not accessible from outside vKirirom area.");
        }
        else if (this.isLocationEnable == false) {
            if (this.platform.is('ios')) {
                this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services");
            }
            else {
                this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location");
            }
        }
        else {
            var confirmAlert = this.alertCtrl.create({
                title: 'Emergency SOS',
                message: "We will generate a SMS along with your current location to our supports. We suggest you not to move far away from your current position, as we're trying our best to get there as soon as possible. \n (Standard SMS rates may apply)",
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
                                var number = ["0962222735", "078777346", "010254531"];
                                var message = "Please help! I'm currently facing an emergency problem. Here is my Location: http://maps.google.com/?q=" + _this.lastLat + "," + _this.lastLng + "";
                                var options = {
                                    replaceLineBreaks: false,
                                    android: {
                                        intent: 'INTENT' // Opens Default sms app
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
    //show app mode description when it's clicked
    Dashboard.prototype.modeClicked = function (_val) {
        var message;
        switch (_val) {
            case 1:
                message = 'Identifying your location to determine application mode.';
                break;
            case 2:
                if (this.platform.is('ios')) {
                    this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services > vKapp > Always");
                    message = "";
                }
                else {
                    this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location > vKapp > Permissions > Location.");
                    message = "";
                }
                break;
            case 3:
                message = 'Welcome to vKirirom. Experience full features of vKapp with OnSite mode including Emergency SOS & Group Chat';
                break;
            case 4:
                message = 'OffSite mode is on. Emergency SOS & Group Chat features are not accessible for OffSite users.';
                break;
            case 5:
                if (this.platform.is('ios')) {
                    this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services");
                    message = "";
                }
                else {
                    this.warningAlert("Unidentified App Mode", "Location failed. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location");
                    message = "";
                }
                break;
        }
        this.makeToast(message);
    };
    Dashboard.prototype.permissionDeniedWarning = function () {
        if (this.platform.is('ios')) {
            this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services > vKapp > Always");
        }
        else {
            this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Location > vKapp > Permissions > Location.");
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
    Dashboard.prototype.makeToast = function (message) {
        Toast.show(message, '5000', 'bottom').subscribe(function (toast) {
            console.log(toast);
        });
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
        { type: MenuController, },
        { type: NgZone, },
    ];
    return Dashboard;
}());
