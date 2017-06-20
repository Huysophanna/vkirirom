import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { Chatmessage } from '../chatmessage/chatmessage';
declare var io: any;

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class Chat {

  socket: any;
  groupChat = [{name: 'Open Discussion', description: 'Join a free topic conversation'}];

  constructor(public navCtrl: NavController,public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    
  }

  navtochatsms(name) {
    this.navCtrl.push(Chatmessage, {
      messageTitle: name
    });
    
  }

}
