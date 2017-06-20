import { Component ,NgZone} from '@angular/core';
import { NavController, ModalController,Events,MenuController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { ServiceDetail } from '../service-detail/service-detail';
import { Notificationpanel } from '../notificationpanel/notificationpanel';
import { NativeStorage } from 'ionic-native';



@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class Services {
  viewModal: any;
  notification_num :any;

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker, public modalCtrl: ModalController,public events :Events,public ngZone :NgZone,public menuCtrl : MenuController) {
   this.events.subscribe('notification_num', data => {
          this.getStorageItem();
         
         
   });

   this.getStorageItem();
   this.menuCtrl.enable(true);
  }

  viewDetail(item) {
    if (item == 2) {
      //massage service
      this.viewModal = this.modalCtrl.create(ServiceDetail, {'imageURL': 'img/massage-poster.jpg'});
      this.viewModal.present();
    }
  }
  getStorageItem() {
      NativeStorage.getItem('notification_num').then(notifications => {
        this.ngZone.run(() => {
        this.notification_num = notifications;
        });
          
      });
  }
  showNoti() {
    let notiModal = this.modalCtrl.create(Notificationpanel);
    notiModal.present();
   

    
    
    this.ngZone.run(() => {
    this.notification_num= 0;
    });
    this.events.publish('clearnotification_num');
  }


}
