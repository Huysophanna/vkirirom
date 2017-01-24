import { Injectable } from '@angular/core';
import { Geolocation } from 'ionic-native';

declare var cordova: any;

@Injectable()
export class LocationTracker {
  public lat: any = 0;
  public lng: any = 0;
  
  public BackgroundTracker() {
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.setDefaults({
      title: 'Chain vKirirom',
      text: 'vKirirom is running in the background'
    });

    if (cordova.plugins.backgroundMode.isEnabled()){
      alert("enable");
    } else {
      alert("unenable");
    }

    alert("K na");

    cordova.plugins.backgroundMode.onactivate();
    this.lat = cordova.plugins.backgroundMode.onactivate(this.lat);
    this.lng = cordova.plugins.backgroundMode.onactivate(this.lng);
    cordova.plugins.backgroundMode.onactivate = function(lati) {
      alert("On activate in Latitute function");
      setInterval(() => {
        Geolocation.getCurrentPosition().then(resp => {
          lati = resp.coords.latitude;
          alert("Geolocation get Latitute" + lati);
        }, (Error)=> {
          alert("Error" + Error);
        })
      }, 5000);
      cordova.plugins.backgroundMode.configure({
        text: 'configured',
        title: 'Chain'
      });
      return lati;
    }

    cordova.plugins.backgroundMode.onactivate = function(longi) {
      alert("On activate");
      setInterval(() => {
        Geolocation.getCurrentPosition().then(resp => {
          longi = resp.coords.longitude;
          alert("Geolocation get longitude" + longi);
        }, (Error) => {
          alert("Error" + Error);
        })
      }, 5000);
      return longi;
    }

    alert("Latitute: " + this.lat);
    alert("Longitute: " + this.lng);

    cordova.plugins.backgroundMode.ondeactivate(this.lat, this.lng)
    cordova.plugins.backgroundMode.ondeactivate = function(lat, lng) {
      Geolocation.getCurrentPosition().then(resp => {
        lat = resp.coords.latitude;
        lng = resp.coords.longitude;
        alert("On deactivate" + lat + lng);
      })
    }
  }
  
}