import { Component } from '@angular/core';
import { SMS, Toast, Geolocation, Network, NativeStorage } from 'ionic-native';
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
    function Dashboard(platform, navCtrl, locationTracker, userScope, alertCtrl, modalCtrl, loadingCtrl, settingService, events, menuCtrl) {
        // let seconds = 0; let flag: any;
        // let checkInterval = setInterval(() => {
        //   if (seconds != 10) {
        //     if ((this.isKirirom == undefined) && (this.isUnknown == false)) {
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
        this.membership = Membership;
        this.isUnknown = false;
        this.launchCount = 0;
        //     }
        //   }
        //   seconds++;
        // }, 1000);
        platform.ready().then(function () {
            //show side menu if it's not login screen
            menuCtrl.enable(true);
            Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(function (resp) {
                var latitute = resp.coords.latitude;
                var longitute = resp.coords.longitude;
                document.addEventListener('deviceready', function () {
                    cordova.plugins.backgroundMode.setDefaults({
                        title: 'Chain',
                        text: 'BackgroundGeolocation'
                    });
                    cordova.plugins.backgroundMode.enable();
                    cordova.plugins.backgroundMode.onactivate = function () {
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
                    cordova.plugins.backgroundMode.ondeactivate = function () {
                        var _this = this;
                        this.locationTracker.lastLocationTracker(latitute, longitute);
                        setInterval(function () {
                            _this.kiriromScope(latitute, longitute);
                        }, 2000);
                    };
                }, false);
                _this.locationTracker.lastLocationTracker(latitute, longitute);
                // alert(latitute + "  " + longitute);
                setInterval(function () {
                    _this.kiriromScope(latitute, longitute);
                }, 2000);
            }, function (err) {
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        _this.events.publish('locationPermission', err.PERMISSION_DENIED);
                        // alert("PERMISSION_DENIED " + err.PERMISSION_DENIED);
                        break;
                    case err.POSITION_UNAVAILABLE:
                        _this.events.publish('locationPermission', err.POSITION_UNAVAILABLE);
                        // alert("POSITION_UNAVAILABLE " + err.POSITION_UNAVAILABLE);
                        break;
                    case err.TIMEOUT:
                        _this.events.publish('locationPermission', err.TIMEOUT);
                        // alert("TIMEOUT " + err.TIMEOUT);
                        break;
                    case err.UNKNOWN_ERROR:
                        _this.events.publish('locationPermission', err.UNKNOWN_ERROR);
                        // alert("UNKNOWN_ERROR " + err.UNKNOWN_ERROR);
                        break;
                }
                // if (err.PERMISSION_DENIED) {
                //   alert("PERMISSION_DENIED");
                // }
                console.log("Geolocation Error :" + _this.isKirirom);
                _this.isUnknown = true;
            });
            // this.launchCount = this.launchCount + 1;
            // NativeStorage.getItem('launchCount').then(data => {
            //   data = data + 1;
            //   NativeStorage.setItem('launchCount', data).then(data => {
            //     console.log("Set launchCount success " + data);
            //   }, err => {
            //     console.error("Set launchCount error : " + err);
            //   });
            // }, err => {
            //   NativeStorage.setItem('launchCount', this.launchCount).then(data => {
            //     console.log("Set launchCount success in err " + data);
            //   }, err => {
            //     console.error("Set launchCount error in err : " + err);
            //   });
            // });
            // this.diagnosticFunction();
        });
    }
    //   diagnosticFunction() {
    //     Diagnostic.isLocationEnabled().then(enabled => {
    //       if (enabled) {
    //         this.geolocationFunction();
    //       } else {
    //         NativeStorage.getItem('launchCount').then(data => {
    //           if (data === 1) {
    //             setTimeout(() => {
    //               let confirm = this.alertCtrl.create({
    //                 title: 'Your location service is turned off',
    //                 message: 'Enable to continue using the application, you can disable in setting.',
    //                 buttons: [
    //                   {
    //                     text: 'Disagree',
    //                     handler: () => {
    //                       console.log('Disagree clicked');
    //                     }
    //                   },
    //                   {
    //                     text: 'Agree',
    //                     handler: () => {
    //                     Diagnostic.switchToLocationSettings();
    //                     this.geolocationFunction();
    //                   }
    //                 }
    //               ]
    //             });
    //           confirm.present();
    //         }, 500);             
    //       } else {
    //         console.log("Not the first launch");
    //         return;
    //       }
    //     }, err => {
    //       console.error("Get launchCount error : " + err);
    //     });
    //   }
    // });
    // this.geolocationFunction();
    //   }
    // geolocationFunction() {
    //   Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(resp => {
    //     let latitute = resp.coords.latitude;
    //     let longitute = resp.coords.longitude;
    //     document.addEventListener('deviceready', function () {
    //       cordova.plugins.backgroundMode.setDefaults({
    //         title: 'Chain',
    //         text: 'BackgroundGeolocation'
    //       });
    //       cordova.plugins.backgroundMode.enable();
    //       cordova.plugins.backgroundMode.onactivate = function () {
    //         setInterval(() => {
    //           let userlocation = [];
    //           NativeStorage.getItem('userlocation').then(data => {
    //             if (JSON.parse(data).length == 5) {
    //               userlocation = [];
    //               NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(data => {
    //                 console.log("Set user location success :" + data);
    //               }, err => {
    //                 console.log("Set userlocation failed :" + err);
    //               });
    //             } else if (JSON.parse(data).length >= 0) {
    //               userlocation.push({
    //                 lat: latitute,
    //                 lng: longitute
    //               });
    //               NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(data => {
    //                 console.log("Set user location success :" + data);
    //               }, err => {
    //                 console.log("Set userlocation failed :" + err);
    //               });
    //             } else {
    //                 console.log("Oupp something went wrong!!!");
    //             }
    //           }, err => {
    //             userlocation.push({
    //               lat: latitute,
    //               lng: longitute
    //             });
    //             NativeStorage.setItem('userlocation', JSON.stringify(userlocation)).then(data => {
    //               console.log("Set user location success :" + data);
    //             }, err => {
    //               console.log("Set user location failed :" + err);
    //             });
    //           });
    //         }, 2000);
    //       };
    //       cordova.plugins.backgroundMode.ondeactivate = function() {
    //         this.locationTracker.lastLocationTracker(latitute, longitute);
    //           setInterval(() => {
    //             this.kiriromScope(latitute, longitute);
    //         }, 2000);
    //       }
    //     }, false);
    //     this.locationTracker.lastLocationTracker(latitute, longitute);
    //     setInterval(() => {
    //       this.kiriromScope(latitute, longitute);
    //     }, 2000);
    //    }, err => {
    //     console.log("Geolocation Error :" + this.isKirirom);
    //     this.isUnknown = true;
    //   });
    // }
    // ionViewWillEnter() {
    //   Diagnostic.isLocationEnabled().then(enabled => {
    //     if (enabled) {
    //       Geolocation.getCurrentPosition().then(resp => {
    //         let latitute = resp.coords.latitude;
    //         let longitute = resp.coords.longitude;
    //         this.locationTracker.lastLocationTracker(latitute, longitute);
    //         setInterval(() => {
    //           this.kiriromScope(latitute, longitute);
    //         }, 2000);
    //       }, err => console.error(err));
    //     } else {
    //       this.isKirirom = undefined;
    //       this.isUnknown = true;
    //     }
    //   }, err => console.error(err));
    // }
    Dashboard.prototype.ionViewCanLeave = function () {
        var _this = this;
        console.log("ionViewDidEnter");
        this.events.subscribe('locationPermission', function (success) {
            switch (success) {
                case 1:
                    setTimeout(function () {
                        _this.warningAlert("Location Permission denied", "Turn on Location Service to Determine your current location");
                    }, 1000);
                    break;
                case 2:
                    Toast.show("Your location is unavailable.", '5000', 'bottom').subscribe(function (toast) {
                        console.log(toast);
                    });
            }
        });
    };
    Dashboard.prototype.showNoti = function () {
        var notiModal = this.modalCtrl.create(Notificationpanel);
        notiModal.present();
    };
    Dashboard.prototype.kiriromScope = function (latitute, longitute) {
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
                    this.warningAlert("OffSite Mode", "This function is not accessible outside kirirom area.");
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
                message = 'vKapp could not identify app mode. Please ensure the location service is on.';
                break;
            case 3:
                message = 'Welcome to vKirirom. Experience full features of vKapp with OnSite mode including Emergency SOS & Group Chat';
                break;
            case 4:
                message = 'OffSite mode is on. Emergency SOS & Group Chat features are not accessible for OffSite users.';
                break;
        }
        this.makeToast(message);
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
    ];
    return Dashboard;
}());
