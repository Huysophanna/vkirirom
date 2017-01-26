import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var cordova: any;

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {
	service = "accom";
	error: any;
	constructor(public platform: Platform){

	}

	catagorize(i){

		switch (i) {
			case 1:
				this.service = "accom";
				break;
			case 2:
				this.service = "service";
				break;
			case 3:
				this.service = "prop";
				break;	
			default:
				this.service = "accom";
				break;
		}
	}


	launchUrl(url){
		console.log('launch url');
		this.platform.ready().then(()=>{
			console.log('platform ready');
			cordova.InAppBrowser.open(url, "_blank", "location=true");
		});
	}

	// getContents(){
	// 	let rootRef = firebase.database().ref();
	// 	let contentsRef = rootRef.child('contents');

	// 	contentsRef.once('value').then((data)=>{
	// 		this.contents = data.val();
	// 	}).catch((error)=>{
	// 		this.error = error.message;
	// 	});
	// }
}
