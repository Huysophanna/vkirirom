import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export var AuthData = (function () {
    function AuthData() {
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('/userProfile');
    }
    //login function
    AuthData.prototype.loginUser = function (email, password) {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    };
    //logout function
    AuthData.prototype.logoutUser = function () {
        return this.fireAuth.signOut();
    };
    //signup function
    AuthData.prototype.signupUser = function (email, password) {
        var _this = this;
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
            .then(function (newUser) {
            _this.userProfile.child(newUser.uid).set({ email: email });
        });
    };
    //reset password function
    AuthData.prototype.resetPassword = function (email) {
        return this.fireAuth.sendPasswordResetEmail(email);
    };
    AuthData.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthData.ctorParameters = [];
    return AuthData;
}());
