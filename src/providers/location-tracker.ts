import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition, BackgroundGeolocation } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationTracker {

  public watch:any;
  public lat:number = 0;
  public lng:number = 0;

  constructor(public http: Http, public zone: NgZone) {
    console.log('Hello LocationTracker Provider');
  }

  startTracking() {
      //Background Tracking
      let Config = {
        desiredAccuracy: 0,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: true,
        interval: 0
      };

      BackgroundGeolocation.configure((location) => {
  
        console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
    
        // Run update inside of Angular's zone
        this.zone.run(() => {
          console.log("Not watch is running");
          this.lat = location.latitude;
          this.lng = location.longitude;
        });
  
    }, (err) => {
        console.log(err);
    }, Config);

    // Turn ON the background-geolocation system.
    BackgroundGeolocation.start();
    console.log(BackgroundGeolocation.start());
 
 
    // Foreground Tracking
    let options = {
      frequency: 3000, 
      enableHighAccuracy: true
    };

    this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
      console.log(position);
  
      // Run update inside of Angular's zone
      this.zone.run(() => {        
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        alert("Watch is running :" + this.lat + " " + this.lng);
      });
 
    });
  }

  stopTracking() {
    console.log("stopTracking");
    BackgroundGeolocation.finish();
    this.watch.unsubscribe();
  }

}
