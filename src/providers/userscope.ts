import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Userscope {

  // Kirirom
  KIRIROMLAT = 11.3292865;
  KIRIROMLNG = 104.0593739;

  // Phnom Penh
  // KIRIROMLAT = 11.563190;
  // KIRIROMLNG = 104.884316;

  constructor(public http: Http) {
    console.log('Hello Userscope Provider');
  }

  distanceCal(latitute, longitude) {
    var R = 6371; // Radius of the earth in km
  	var dLat = this.deg2rad(this.KIRIROMLAT-latitute);  // deg2rad below
  	var dLon = this.deg2rad(this.KIRIROMLNG-longitude); 
  	var a = 
    	Math.sin(dLat/2) * Math.sin(dLat/2) +
    	Math.cos(this.deg2rad(latitute)) * Math.cos(this.deg2rad(this.KIRIROMLAT)) * 
    	Math.sin(dLon/2) * Math.sin(dLon/2); 
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  	var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }

}
