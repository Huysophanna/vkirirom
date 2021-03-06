import { Injectable } from '@angular/core';
import { Geolocation, NativeStorage } from 'ionic-native';

declare var cordova: any;

@Injectable()
export class LocationTracker {
  public lat: any;
  public lng: any;

  public userlocation = [];

  public latitute = [];
  public longitute = [];

  lastLocationTracker(latitute, longitute) {
      NativeStorage.getItem('userlocation').then(data => {
        if (JSON.parse(data).length <= 5 && JSON.parse(data).length >= 0) {
          // this.userlocation = [];
          // this.setUserlocation(this.userlocation);

          this.userlocation.push({
            lat: latitute,
            lng: longitute
          });
          this.setUserlocation(this.userlocation);
          // alert("in if :" + this.userlocation);
        } else {
          // console.log("Oupp something went wrong!!!");
          this.userlocation = [{
            lat: latitute,
            lng: longitute
          }];
          this.setUserlocation(this.userlocation);
        }
      }, err => {
        // alert("lastLocationTracker cannot getItem");
        this.userlocation.push({
          lat: latitute,
          lng: longitute
        });
        this.setUserlocation(this.userlocation);
        // alert("set In err :" + this.userlocation);
      });
  }

  setUserlocation(location) {
    NativeStorage.setItem('userlocation', JSON.stringify(location)).then(data => {
      //console.log("Set user location success :" + data);
    }, err => {
      console.error("Set userlocation failed :" + err);
    });
  }

  getUserlocation() {
    NativeStorage.getItem('userlocation').then(data => {
      var parseUserlocation = JSON.parse(data);
      this.lat = parseUserlocation[parseUserlocation.length - 1].lat;
      this.lng = parseUserlocation[parseUserlocation.length - 1].lng;
    }, err => {
      console.log("Get user location failed : " + err);
    });
  }
  
}