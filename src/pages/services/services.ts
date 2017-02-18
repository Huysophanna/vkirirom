import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { ServiceDetail } from '../service-detail/service-detail';

@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class Services {
  viewModal: any;

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker, public modalCtrl: ModalController) {
  }

  viewDetail(item) {
    if (item == 2) {
      //massage service
      this.viewModal = this.modalCtrl.create(ServiceDetail, {'imageURL': 'img/massage-poster.jpg'});
      this.viewModal.present();
    }
  }

}
