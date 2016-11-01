import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from 'ionic-native';
import { Toast } from 'ionic-native';
import { Membership } from '../membership/membership';
/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var Dashboard = (function () {
    function Dashboard(navCtrl) {
        this.navCtrl = navCtrl;
        this.membership = Membership;
    }
    Dashboard.prototype.navigate = function () {
        console.log("function is calling");
        this.navCtrl.push(Membership);
    };
    Dashboard.prototype.sos = function () {
        SMS.send('+855962304669', 'Hello World')
            .then(function () {
            alert('success');
        }, function () {
            Toast.show("I'm a toast", '5000', 'center').subscribe(function (toast) {
                console.log(toast);
            });
        });
        console.log("SOS is calling ");
    };
    Dashboard.prototype.ionViewDidLoad = function () {
        console.log('Hello Dashboard Page');
    };
    Dashboard.decorators = [
        { type: Component, args: [{
                    selector: 'page-dashboard',
                    templateUrl: 'dashboard.html'
                },] },
    ];
    /** @nocollapse */
    Dashboard.ctorParameters = [
        { type: NavController, },
    ];
    return Dashboard;
}());
