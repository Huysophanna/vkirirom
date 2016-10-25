import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export var Api = (function () {
    function Api(http) {
        this.http = http;
        console.log('Hello Api Provider');
    }
    Api.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Api.ctorParameters = [
        { type: Http, },
    ];
    return Api;
}());
