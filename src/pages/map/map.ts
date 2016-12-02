import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation, GoogleMapsMarker, CameraPosition, GoogleMapsMarkerOptions} from 'ionic-native';
declare var plugin: any;
declare var navigator: any;

@Component({
	selector: 'page-map',
 	templateUrl: 'map.html',
})

export class GoogleMapPage {
	Map: any;
  Longitude: any;
  Latitude: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      this.initMap();
      this.watchPosition();
    });
  }

  watchPosition(){
    navigator.geolocation.watchPosition(this.onWatchSuccess,this.onWatchError,{enableHighAccuracy: true});
  }

  onWatchSuccess(position){
    this.Latitude = position.coords.Latitude;
    this.Longitude = position.coords.Longitude;

  }

  onWatchError(error){
    console.log(error.code+" : "+error.message);
  }

  initMap(){
    // create a new map using element ID
    let LatLng = new GoogleMapsLatLng(11.3167, 104.0651);
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
        marker.setTitle('vKirirom Pine Resort');
      });

    let bounds = [
      new GoogleMapsLatLng(11.3191, 104.0743),
      new GoogleMapsLatLng(11.3202, 104.0606),
      new GoogleMapsLatLng(11.3116, 104.0599),
      new GoogleMapsLatLng(11.3099, 104.0734),
    ];
    // let bounds = [
    //   new GoogleMapsLatLng(11.3202, 104.0734),
    //   new GoogleMapsLatLng(11.3202, 104.0599),
    //   new GoogleMapsLatLng(11.3099, 104.0599),
    //   new GoogleMapsLatLng(11.3099, 104.0734),
    // ];



    map.addGroundOverlay({
      'url': "img/vmap.png",
      'bounds': bounds
    });

    map.setAllGesturesEnabled(true);
  }

}