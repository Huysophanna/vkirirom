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
  mapTile: any;
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
        new GoogleMapsLatLng(11.3432, 104.0842),
        new GoogleMapsLatLng(11.3432, 104.0323),
        new GoogleMapsLatLng(11.3044, 104.0322),
        new GoogleMapsLatLng(11.3040, 104.0846),
      ];

      // let bounds = [
      //   new GoogleMapsLatLng(11.3191, 104.0743),
      //   new GoogleMapsLatLng(11.3202, 104.0606),
      //   new GoogleMapsLatLng(11.3116, 104.0599),
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
          { title: "Kirirom Institute of Technology", lat: 11.3152, lng: 104.0676, snippet: "The first boarding school in Cambodia, specialized in software engineering. Students are also engaged in internship projects while studying." }, 
                { title: "Activity Center", lat: 11.3165, lng: 104.0648, snippet: "Pleasant activity staff offers the information regarding various types of activities. Activity in fresh air helps you refresh your mind. Open 8:00-17:00." }, 
                { title: "Pine View Kitchen", lat: 11.3167, lng: 104.0653, snippet: "At the open space restaurant, Pine View Kitchen helps you enjoy a chef’s special full course of modern Khmer cuisine." }, 
                { title: "Reception", lat: 11.3174, lng: 104.0649, snippet: "Customers can be welcomed to vKirirom Pine Resort. Open 8:00-20:00.Our staffs can speak English, Khmer, Japanese. Customers are provided with amenities as well." }, 
                { title: "Big Party Tent", lat: 11.3137, lng: 104.0667, snippet: "A tent which occupies large space which is suitable for big events, conferences and many activities. Even during rainy days, this large tent provides enjoyable indoor activity." }, 
                { title: "Mogringa Restaurant", lat: 11.3154, lng: 104.0638, snippet: "Khmer style nature fused restaurant which serves Khmer original meals. You can also buy breads and drinks here." }, 
                { title: "Villa Jasmine", lat: 11.3181, lng: 104.0633, snippet: "Quite elegant cottage which promises you a lot of pleasant experiences on the cool Kirirom Mountain top for couples and small families." }, 
                { title: "Villa Suite", lat: 11.3180, lng: 104.0655, snippet: "Modern designed luxury room. This two-bedroom villa with a mezzanine level is suitable for big families or groups." }, 
                { title: "Pipe Room", lat: 11.3126, lng: 104.0628, snippet: "The most uniquely designed room derived from an earthen pipe which serves best amongst all." }, 
                { title: "Luxury Tent", lat: 11.3145, lng: 104.0646, snippet: "High quality tent with comfortable hotel type room. Modern tent houses which have a king size bed and a nice shower room." }, 
                { title: "Khmer Cottage", lat: 11.3149, lng: 104.0644, snippet: "Khmer farmers' open-style houses which are nicely decorated with natural materials. Best rooms to experience real Khmer tradition and feel the natural fresh air." }, 
                { title: "Playground Field", lat: 11.3162, lng: 104.0654, snippet: "Enjoy many kinds of activities including football, tennis, volleyball, bubble sumo etc. Feel free to ask our activity staff for details." }, 
                { title: "Camping Area", lat: 11.3134, lng: 104.0648, snippet: "Enjoy camping with camp fire in a large area space with high level of security provided." }, 
                { title: "Climbing Theater", lat: 11.3158, lng: 104.0654, snippet: "It is a multi-purpose building which during day time can be used to enjoy wall climbing as well as a movie screen at night time." }, 
                { title: "Kirirom Lake", lat: 11.3344, lng: 104.0516, snippet: "A beautiful lake, provides enough water supply for all the villager"}, 
                { title: "Village", lat: 11.3348, lng: 104.0550, snippet: "A Village where people enjoy living on Kirirom Mountain with a perfect view." }, 
                { title: "Ministry of Environment", lat: 11.3330, lng: 104.0531, snippet: "Ministry of Environment that supports the whole Kirirom environment." }, 
                { title: "Bungalow", lat: 11.3165, lng: 104.0658, snippet: "Stay in one of our specially designed bungalows and experience the invigorating fresh air and peaceful life in the pine forests of kirirom" }, 
                { title: "Swimming Pool", lat: 11.3168, lng: 104.0658, snippet: "Enjoy swimming with your family and friends with the surrounded pine trees and the fresh air." }, 
                { title: "Tennis Court", lat: 11.3121, lng: 104.0653, snippet: "Enjoy playing tennis on top of the mountain surrounded by pine trees." }, 
                { title: "Parking Area", lat: 11.3169, lng: 104.0647, snippet: "Big secure parking space for customers vehicle." }, 
                { title: "Container Cafe", lat: 11.3139, lng: 104.0654, snippet: "A place for coffee lovers who enjoy having the amazing flavours with fresh air" }, 
                { title: "Farm", lat: 11.3134, lng: 104.0636, snippet: "An organic farm that grows a variety of foods such as Strawberry, Pineapple, Passions etc." }, 
                { title: "Crazy Hills", lat: 11.3136, lng: 104.0751, snippet: "An outdoor party stage for big event in the top mountain of kirirom. You can enjoy lunch, BBQ and also drinks with karaoke." }, 
                { title: "Dragon Statue", lat: 11.3409, lng: 104.0597, snippet: "Dragon Statues (snake God) whose four heads are landmark, is situated in the center of the center of the intersection." }, 
                { title: "Old Kirirom Pagoda", lat: 11.3201, lng: 104.0362, snippet: "It is a Buddhist temple with the longest histroy in Kirirom.It makes you back to the good days in Cambodia.Please follow this good manners when worship ping the temple." }, 
                { title: "New Kirirom Pagoda", lat: 11.3304, lng: 104.0769, snippet: "On the top of the stairs of gentle slope. A mural paining drawn Buddha's life inside of the building is also an sightseeing spot." }, 
                { title: "Otrosek Waterfall", lat: 11.3111, lng: 104.0784, snippet: "This place us know to those in the know, and it is loved by locals. We recommend you to visit there during the rainy season." }, 
                { title: "Srash Srang Lake", lat: 11.3291, lng: 104.0379, snippet: "The landscape is almost as if it is a framed picture. You can feel the magnificence of the nature while being away from the hustle and bustle of the city." }, 
                { title: "King's Residence", lat: 11.3309, lng: 104.0606, snippet: "The residence,which quietly stands among a pine grove,was a old fashioned cottage built of bricks." }, 
                { title: "Visitor Center", lat: 11.3351, lng: 104.0407, snippet: "A visitor center which introduce the history of Kirirom. It is a wonderful photogenic spot." }, 
                { title: "Football Court", lat: 11.3133, lng: 104.0657, snippet: "Customers can also enjoy playing football with their friends together in the resort." }, 
                { title: "Volleyball Court", lat: 11.3129, lng: 104.0657, snippet: "Customers can also enjoy playing volleyball with their friends together in the resort." }, 
                // { title: "Hanamaru International School attached KIT", lat: 11.3153, lng: 104.0687, snippet: "An international primary school is going to start. Students can enjoy their schooling days among fresh nature." }, 
                { title: "Kirirom Elementary School", lat: 11.3345, lng: 104.0553, snippet: "It is the only elementary school established by mainly vKirirom stuff.For the bright future of children regardless of the envirionment the were grown up." },
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

        this.map.addGroundOverlay({
            'url': mapUrl,
            'bounds': bounds
        }).then(_success => {
            this.addedOverlayInterval = setInterval(() => {
                if (_success) {
                    clearInterval(this.addedOverlayInterval);
                    this.loader.dismiss();
                }
            });
        });

        // this.map.addedOverlayInterval({
        //   tileUrlFormat: "https://a.tile.openstreetmap.org/<zoom>/<x>/<y>.png",
        //   zIndex: 10
        // }, function(tileOverlay){
        //     alert('callback function');
        //     this.mapTile = tileOverlay;
        // });
        
        this.map.setAllGesturesEnabled(true);

      });


  }

  createNewMarker(lat, lng, title, snippet) {
      let customMarker = "www/assets/icon.png";

     // create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: new GoogleMapsLatLng(lat, lng),
        title: [title].join("\n"),
        snippet: snippet,

        icon: customMarker,
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
