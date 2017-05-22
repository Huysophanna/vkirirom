import { Component, AfterViewInit } from '@angular/core';
import { Events, NavController, LoadingController, AlertController, Platform } from 'ionic-angular';
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
  map: any;
  title: any;
  snippet: any;
  icon: any;
  marker: any;
  loader: any;
  androidVersion: any;
  addedOverlayInterval: any;

  constructor(public events: Events,
    public navCtrl: NavController,
    public platform: Platform,
    public loadingCtrl: LoadingController) {
    platform.ready().then(() => {

        if (platform.is('android')) {
            //check android version
            this.androidVersion = parseInt(platform.version().str);
        }
        this.loader = this.loadingCtrl.create({
            content: 'Initializing Map ...',
        });
        // this.loader.present();

    });
  }

  ngAfterViewInit() {
      this.initMap();
  }

  initMap(){
    // create a new map using element ID
    let LatLng = new GoogleMapsLatLng(11.3167, 104.0651);
    this.map = new GoogleMap('map', {
          maxZoom:6,
          minZoom:9,
          zoom:15,
          mapTypeControl: true,
          backgroundColor: 'white',
          controls: {
            compass: true,
            myLocationButton: true,
            indoorPicker: true,
            zoom: true
          },
          gestures: {
            scroll: true,
            tilt: true,
            rotate: true,
            zoom: true
          },
          camera: {
            latLng: LatLng,
            // tilt: 30,
            zoom: 15,
            // bearing: 50
          }
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

    //   }, 1000);



      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
          // create CameraPosition
          let position: CameraPosition = {
            target: LatLng,
            zoom: 18,
            tilt: 30
          };

          // move the map's camera to position
          this.map.animateCamera({
            'target': LatLng,
            'zoom': 17
            // 'bearing': 140
          });

          this.marker = [
            {title: "Kirirom Institute of Technology", lat: 11.3150, lng: 104.0677, snippet: "First boarding school in Cambodia, specialize skill in Software Engineer."},
            {title: "Activity Center", lat: 11.3165, lng: 104.0648, snippet: "Enjoy vKirirom activities, team building with your family and friends. Visit us now!"},
            {title: "Pine View Restaurant", lat: 11.3167, lng: 104.0653, snippet: "Serves the best foods with our experienced chefs among all the pine trees."},
            {title: "Reception", lat: 11.3174, lng: 104.0649, snippet: "We offer accommodation - activites and many more services that are available to book now in our Reception."},
            {title: "Big Party Tent", lat: 11.3135, lng: 104.0666, snippet: "Celetebrate big events, party, conferences and many activities here with large space provided."},
            {title: "Mogina Restaurant", lat: 11.3151, lng: 104.0637, snippet: "Serves best Khmer foods, drinks and many other kind of snacks with perfect taste. Visit us now!"},
            {title: "Villa Jasmine", lat: 11.3181, lng: 104.0633, snippet: "One type of real estate we provide that comes with natural & comfortable design."},
            {title: "Orchid Hills", lat: 11.3180, lng: 104.0650, snippet: "One type of real estate we provide that comes with natural & comfortable design."},
            {title: "Borey Type V", lat: 11.3175, lng: 104.0666, snippet: "One type of real estate we provide that comes with natural & comfortable design."},
            {title: "Container Hotel", lat: 11.3158, lng: 104.0721, snippet: "Experience new hotel designed based on a container which is only available at vKirirom."},
            {title: "Pipe Room", lat: 11.3117, lng: 104.0625, snippet: "The most amazing designed room from a pipe which serves best among all."},
            {title: "Luxury Tent", lat: 11.3146, lng: 104.0649, snippet: "Another amazing designed room from a tent, serves best with many facilities provided."},
            {title: "Khmer Cottage", lat: 11.3150, lng: 104.0643, snippet: "From Khmer traditional way, cottage is still best especially in this green environment."},
            {title: "Playground Field", lat: 11.3131, lng: 104.0661, snippet: "Enjoy many kind of activities in playground field including soccers, bubble sumo etc."},
            {title: "Camping Area", lat: 11.3134, lng: 104.0648, snippet: "Enjoy camping with camp fire in a large area space with high level security provided."},
            {title: "Generator Building", lat: 11.3156, lng: 104.0648, snippet: "Generate main electricity source - internet servers for the whole resort usage."},
            {title: "Staff Building", lat: 11.3136, lng: 104.0731, snippet: "Accommodation building for staffs and other workers."},
						{title: "Tennis Court " , lat: 11.3121, lng: 104.0652, snippet: "Tennis court for the customer . "},
          ];

          this.marker.forEach(element => {
            this.createNewMarker(element.lat, element.lng, element.title, element.snippet);
          });



          let mapUrl: any;
          if (this.platform.is('ios')) {
            mapUrl = "img/vmap.png";
          } else {
              if (this.androidVersion >= 6) {
                //above android 6.0, load higher quality map
                mapUrl = "img/vmap.png";
              } else {
                //below android 6.0, replace with low quality map
                mapUrl = "img/vmap-android.png";
              }
          }

        // this.map.addGroundOverlay({
        //     'url': mapUrl,
        //     'bounds': bounds
        // }).then(_success => {
        //     this.addedOverlayInterval = setInterval(() => {
        //         if (_success) {
        //             clearInterval(this.addedOverlayInterval);
        //             this.loader.dismiss();
        //         }
        //     });
        // });
				// let mapBounds = new plugin.google.maps.LatLngBounds(
				//     new plugin.google.maps.LatLng(11.309760, 104.059195),
				//     new plugin.google.maps.LatLng(11.320254, 104.075164));
      
				this.map.addTileOverlaY({
					tileUrlFormat: "img/map/<zoom>/<x>/<y>.png",
					zIndex: 10
				}, function(tileOverlay){
						// this.map.showDialog();
				});

        this.map.setAllGesturesEnabled(true);

      });


  }

  createNewMarker(lat, lng, title, snippet) {
     // create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: new GoogleMapsLatLng(lat, lng),
        title: [title].join("\n"),
        snippet: snippet,

        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        styles: {
            "text-align": "center",
            "maxWidth": "80%", // This can be percentage (%) or just a numeric value from 0.0 to 1.0 for percentile representation, or the numeric width in pixels.
            "color": "#1C8954"
        },

        // animation: plugin.google.maps.Animation.DROP
      };

      this.map.addMarker(markerOptions)
        .then((marker: GoogleMapsMarker) => {
          marker.hideInfoWindow();
          // marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          // });
      });

  }

  ngOnDestroy() {
      if (this.platform.is('ios')) {
        this.map.clear();
        this.map.remove();
      }
  }

}
