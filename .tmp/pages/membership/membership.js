import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Membership page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var Membership = (function () {
    function Membership(navCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.storage.get('userProfile').then(function (value) {
            _this.userName = value.displayName;
            _this.userPhoto = value.photoURL;
        });
    }
    Membership.prototype.ionViewDidLoad = function () {
        console.log('Hello Membership Page');
    };
    Membership.prototype.pointSys = function () {
        if (this.point == 0) {
            console.log("Out of vPoint!!!!!");
        }
        else {
            console.log("Point is here!!!!");
        }
    };
    Membership.decorators = [
        { type: Component, args: [{
                    selector: 'page-membership',
                    templateUrl: 'membership.html'
                },] },
    ];
    /** @nocollapse */
    Membership.ctorParameters = [
        { type: NavController, },
        { type: Storage, },
    ];
    return Membership;
}());
