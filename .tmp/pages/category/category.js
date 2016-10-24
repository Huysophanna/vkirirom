import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var Category = (function () {
    function Category(navCtrl, api, params) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.params = params;
    }
    Category.prototype.ionViewDidLoad = function () {
        console.log('Hello Category Page');
        this.title = this.params.data.title;
    };
    Category.decorators = [
        { type: Component, args: [{
                    selector: 'page-category',
                    templateUrl: 'category.html'
                },] },
    ];
    /** @nocollapse */
    Category.ctorParameters = [
        { type: NavController, },
        { type: Api, },
        { type: NavParams, },
    ];
    return Category;
}());
