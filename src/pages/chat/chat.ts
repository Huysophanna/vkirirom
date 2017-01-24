import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chatmessage } from '../chatmessage/chatmessage';
declare var io: any;

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class Chat {

  socket: any;
  Name = ["Room One"]

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('Hello Chat Page');
  }

  navtochatsms(name) {
    console.log("clicked");
    this.navCtrl.push(Chatmessage, {
      messageTitle: name
    });
    
  }

}
