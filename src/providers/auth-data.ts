import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {
  // Here we declare the variables we'll be using.
  public fireAuth: any;
  public userProfile: any;

  constructor() {
    // firebase.initializeApp({
    //     apiKey: "AIzaSyDorWd2MGbJbVjHiKvL3jo2F1qe31A6R08",
    //     authDomain: "vkirirom-809f8.firebaseapp.com",
    //     databaseURL: "https://vkirirom-809f8.firebaseio.com",
    //     storageBucket: "vkirirom-809f8.appspot.com",
    //     messagingSenderId: "82070365426"
    // });
    
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  //login function
  loginUser(email: string, password: string): any {
    console.log("service login");
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  //logout function
  logoutUser(): any {
    console.log("service logout");
    return this.fireAuth.signOut();
  }

  //signup function
  signupUser(email: string, password: string): any {
    console.log("service signup");
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  //reset password function
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

}
