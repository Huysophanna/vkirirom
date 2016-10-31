import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/*
  Generated class for the Membership page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var Membership = (function () {
    function Membership(navCtrl) {
        this.navCtrl = navCtrl;
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
    ];
    return Membership;
}());
