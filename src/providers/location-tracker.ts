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

  lastLocationTracker() {
    alert("lastLocationTracker");
    setInterval(() => {
      Geolocation.getCurrentPosition().then(resp => {
        alert("In Geolocation");
        let latitute = resp.coords.latitude;
        let longitute = resp.coords.longitude;
        NativeStorage.getItem('userlocation').then(data => {
          alert("In normal : " + JSON.parse(data).length);
          if (JSON.parse(data).length == 5) {
            this.userlocation = [];
            this.setUserlocation(this.userlocation);
            alert("in if :" + this.userlocation);
          } else if (JSON.parse(data) >= 0) {
            this.userlocation.push({
              lat: latitute,
              lng: longitute
            });            
            this.setUserlocation(this.userlocation);
            alert("in else if :" + this.userlocation);
          } else {
            console.log("Oupp something went wrong!!!");
          }
        }, err => {
          console.log("Cannot getItem");
          this.userlocation.push({
            lat: latitute,
            lng: longitute
          });
          this.setUserlocation(this.userlocation);
          alert("set In err :" + this.userlocation);
        });
      });
    }, 2000);
  }

  setUserlocation(location) {
    alert("In setUserlocation");
    NativeStorage.setItem('userlocation', JSON.stringify(location)).then(data => {
      alert("Set user location success :" + data);
    }, err => {
      alert("Set userlocation failed :" + err);
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