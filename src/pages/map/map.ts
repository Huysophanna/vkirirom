import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation, GoogleMapsMarker, CameraPosition, GoogleMapsMarkerOptions} from 'ionic-native';
declare var plugin: any;

@Component({
	selector: 'page-map',
 	templateUrl: 'map.html',
})

export class GoogleMapPage{
	Map: any;
  Longitude: any;
  Latitude: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap(){
    // create a new map using element ID
    let LatLng = new GoogleMapsLatLng(43.0741904, -89.3809802);
    let map = new GoogleMap('map', {
          'mapTypeControl': true,
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': LatLng,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
    map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
    });

    // create CameraPosition
    let position: CameraPosition = {
      target: LatLng,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.animateCamera({
      'target': LatLng,
      'tilt': 60,
      'zoom': 18,
      'bearing': 140
    });

    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
      position: LatLng,
      title: 'vKirirom Pine Resort'
    };

    map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });

    let bounds = [
      new GoogleMapsLatLng(43.0741904, -89.3809802),
      new GoogleMapsLatLng(43.6741904, -89.2809802)
    ];

    map.addGroundOverlay({
      'url': "img/testmap.jpg",
      'bounds': bounds
    });

    map.setAllGesturesEnabled(true);
  }

}