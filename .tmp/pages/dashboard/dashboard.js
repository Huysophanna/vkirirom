import { Component, NgZone } from '@angular/core';
import { BackgroundMode, SMS, Toast, Geolocation, Network, NativeStorage, Diagnostic } from 'ionic-native';
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
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
export var Dashboard = (function () {
    function Dashboard(platform, navCtrl, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl, settingService, events, menuCtrl, ngZone, http) {
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
        this.http = http;
        this.membership = Membership;
        this.isUnknown = false;
        this.launchCount = 0;
        this.isLocationEnable = true;
        this.checkNetworkConnection();
        platform.ready().then(function () {
            //show side menu if it's not login screen
            menuCtrl.enable(true);
            setInterval(function () {
                _this.fetchUserGeoLocation();
                console.log("fetchUserGeoLocation in platform ready");
            }, 2000);
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
                NativeStorage.setItem('mapFirstInitialization', true);
            }
            else {
                if (distance <= 17) {
                    _this.isKirirom = true;
                    _this.isUnknown = false;
                    NativeStorage.setItem('mapFirstInitialization', true);
                    _this.events.publish('isKirirom', _this.isKirirom);
                }
                else {
                    _this.isKirirom = false;
                    _this.isUnknown = false;
                    _this.events.publish('isKirirom', _this.isKirirom);
                }
            }
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
                if (this.platform.is('android')) {
                    if (this.locationPermissionDenied) {
                        this.warningAlert("Unidentified App Mode", "Location permission denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > App > vKclub > Permission > Location");
                    }
                    else {
                        this.navCtrl.push(GoogleMapPage);
                    }
                }
                else {
                    //is iOS platform
                    this.navCtrl.push(GoogleMapPage);
                }
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
                Geolocation.getCurrentPosition().then(function (resp) {
                    _this.isUnknown = false;
                    var latitute = resp.coords.latitude;
                    var longitute = resp.coords.longitude;
                    BackgroundMode.enable();
                    // BackgroundMode.onactivate().subscribe(() => {
                    BackgroundMode.on("activate").subscribe(function () {
                        var userlocation = [];
                        NativeStorage.getItem('userlocation').then(function (data) {
                            if (JSON.parse(data).length >= 5) {
                                userlocation = [];
                                NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(function (data) {
                                    console.log("Set user location success :" + data);
                                }, function (err) {
                                    console.log("Set userlocation failed :" + err);
                                });
                            }
                            else if ((JSON.parse(data).length >= 0) && (JSON.parse(data).length < 5)) {
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
                                console.log("Error, went wrong!!! " + JSON.parse(data).length);
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
        var errorCallback = function (e) { return console.error(e); };
        Diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
    };
    Dashboard.prototype.sos = function () {
        this.checkNetworkConnection();
        if (this.connectionStatus === "internet") {
            this.presentSOSAlert("We will forward the request along with your current location to our supports. We suggest you not to move far away from your current position, as we're trying our best to get there as soon as possible.");
        }
        else {
            this.presentSOSAlert("We will generate a SMS along with your current location to our supports. We suggest you not to move far away from your current position, as we're trying our best to get there as soon as possible. \n (Standard SMS rates may apply)");
        }
    };
    Dashboard.prototype.presentSOSAlert = function (message) {
        var _this = this;
        var confirmAlert = this.alertCtrl.create({
            title: 'Emergency SOS',
            message: message,
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
                            if (_this.connectionStatus === 'internet') {
                                _this.makeToast("Requesting help to vKirirom Team using internet connection. Please stay safe and wait ...");
                                // reqeust twilio api
                                _this.http.get('https://emergencysms.herokuapp.com/emergency_request?Body=hithereemergency&From=phanith').map(function (res) { return res.json(); }).subscribe(function (data) {
                                    console.log('data from twilio ' + data.result);
                                    if (data.status.sendSuccess) {
                                        _this.warningAlert('Send Sucesss', 'Your emergency message has been sent sucessfully! Our team will try best to rescure as soon as possible.');
                                    }
                                    else {
                                        _this.warningAlert('Message is already sent', 'Your emergency message has been sent once please stay there and we will try our best to reach there.');
                                    }
                                }, function (error) {
                                    _this.warningAlert('Connection Problem', 'There is problem due to internet connection. Please try again.');
                                });
                            }
                            else {
                                // send SMS
                                SMS.send(number, message, options)
                                    .then(function () {
                                    // Toast.show("Please stay safe. Our team will be there so soon!", '5000', 'bottom').subscribe(
                                    //   toast => {
                                    //     console.log(toast);
                                    //   }
                                    // );
                                    console.log("Message sent success");
                                }, function (error) {
                                    // Toast.show("You cancelled the action", '5000', 'bottom').subscribe(
                                    //   toast => {
                                    //     console.log(toast);
                                    //   }
                                    // );
                                    console.log("User cancel the action");
                                });
                            }
                        }, function (err) {
                            _this.warningAlert("Get user location from storage failed", err);
                        });
                    }
                }],
            cssClass: 'emergencyAlert'
        });
        confirmAlert.present();
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
                    this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services > vKclub > Always");
                    message = "";
                }
                else {
                    this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > App > vKclub > Permission > Location");
                    message = "";
                }
                break;
            case 3:
                message = 'Welcome to vKirirom. Experience full features of vKclub with OnSite mode including Emergency SOS & Group Chat';
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
            this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > Privacy > Location Services > vKclub > Always");
        }
        else {
            this.warningAlert("Unidentified App Mode", "Location Permission Denied. Turn on Location Service to Determine your current location for App Mode: \n Setting > App > vKclub > Permission > Location");
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
    Dashboard.prototype.checkNetworkConnection = function () {
        if ((Network.type === 'none')) {
            this.connectionStatus = "No internet";
        }
        else {
            this.connectionStatus = "internet";
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
        { type: Http, },
    ];
    return Dashboard;
}());
