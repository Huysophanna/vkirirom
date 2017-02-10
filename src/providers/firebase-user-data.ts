import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NativeStorage } from 'ionic-native';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class FirebaseUserData {
public userProfile: any;
public data = {
    username: "",
    token: "",
    bgLocationTag: true
}

  constructor(public http: Http) {
    console.log('Hello FirebaseUserData Provider');

  }



   retrieveUserData() {
    NativeStorage.getItem('userDetails').then(data => {
      this.userProfile = data;
      this.data.username = data.displayName;

      //retrieve data from firebase 
      firebase.database().ref('Users/' + data.uid).on('value', (snapshot) => {
        this.data.bgLocationTag = snapshot.child('bgLocationTag').val();
      });

    });

    NativeStorage.getItem('deviceToken').then(data => {
      this.data.token = data;
    });
  }

  updateBgLocationTag(value) {
    //update bgLocationTag to firebase
    let user = firebase.database().ref('/Users/' + this.userProfile.uid);
    user.update({"bgLocationTag": value});
    NativeStorage.setItem('bgLocationTag', value);
  }

}
