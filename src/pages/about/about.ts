import { Component,NgZone } from '@angular/core';
import { NavController, Platform ,Events,ModalController,MenuController} from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { Notificationpanel } from '../notificationpanel/notificationpanel';

declare var cordova: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {
	service = "accom";
	error: any;
	notification_num :any;
	constructor(public platform: Platform,public ngZone :NgZone,public events :Events,public modalCtrl :ModalController,public menuCtrl : MenuController ){
	this.events.subscribe('notification_num', data => {
          this.getStorageItem();
         
         
    });

	this.menuCtrl.enable(true);
	this.getStorageItem();
	}
	showNoti() {
	let notiModal = this.modalCtrl.create(Notificationpanel);
    notiModal.present();
   

    
    
    this.ngZone.run(() => {
    this.notification_num= 0;
    });
    this.events.publish('clearnotification_num');
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
	 getStorageItem() {
      NativeStorage.getItem('notification_num').then(notifications => {
 
        
        this.ngZone.run(() => {
        this.notification_num = notifications;
        });
          
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
