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
    Api.prototype.category = function () {
        return this.http.get('http://localhost/ionWordpress/wp-json/wp/v2/categories')
            .toPromise()
            .then(function (data) { return data.json(); });
    };
    Api.prototype.posts_category = function (id, page) {
        return this.http.get("http://localhost/ionWordpress/wp-json/wp/v2/posts?_embed&categories=" + id + "&filter[order]=DESC&filter[posts_per_page]=5&page=" + page)
            .toPromise()
            .then(function (data) { return data.json; });
    };
    Api.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Api.ctorParameters = [
        { type: Http, },
    ];
    return Api;
}());
