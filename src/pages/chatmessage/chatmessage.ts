import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content, Platform, AlertController} from 'ionic-angular';
import { NativeStorage, Network } from 'ionic-native';
import {Observable} from 'rxjs/Observable';
declare var io: any;

/*
  Generated class for the Chatmessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chatmessage',
  templateUrl: 'chatmessage.html'
})
export class Chatmessage {
  @ViewChild(Content) content: Content;
  static get parameters() {
    return [NgZone];
  }
  timeStatus: string;
  hours: any;
  minute: any;
  isUser: boolean;
  chatsLength: number;
  timeLength: number;
  time: any;
  timeObj: any;
  chats: any;
  chatinp: any;
  pkt: any;
  socket: any;
  userName: any;
  userPhoto: any;
  messageTitle: any;
  userStatus: any;
  constructor(public navCtrl: NavController, public ngzone: NgZone, private platform: Platform, private alertCtrl: AlertController) {
        this.isUser = false;
        this.ngzone = new NgZone({enableLongStackTrace: false});
        this.chats = [];
        this.userStatus = [];
        this.chatinp ='';
        this.pkt = {
            data: '',
            room: 'room1'
        };
        this.time = [];
        this.socket = io.connect('http://110.74.203.152:3000');
        this.socket.on(this.pkt.room + 'message', (msg) => {
          this.ngzone.run(() => {
            this.timeObj = new Date();
            this.hours = this.timeObj.getHours().toString();
            if (this.hours >= 1 && this.hours <= 12) {
              this.timeStatus = "AM";
            } else if (this.hours > 12 && this.hours <= 24) {
              this.timeStatus = "PM";
              this.hours = this.hours - 12;
            } else {
              this.timeStatus = "";
            }
            
            this.minute = this.timeObj.getMinutes().toString();
            this.chats.push(msg);
            this.time.push(this.hours +":"+ this.minute);    
            this.timeLength = this.time.length;
            this.chatsLength = this.chats.length;
            console.log(this.time);
            if (this.isUser == true) {
              console.log("This is me !!!!");
            } else {
              console.log("Not me");
            }

            this.content.scrollToBottom();
          });
          
        }); 

        this.socket.on(this.pkt.room + 'userentered', (userenter) => {
            this.ngzone.run(() => {
                this.timeObj = new Date();
                this.hours = this.timeObj.getHours().toString();
                if (this.hours >=1 && this.hours <= 12) {
                  this.timeStatus = "AM";
                } else if (this.hours > 12 && this.hours <= 24) {
                  this.timeStatus = "PM";
                  this.hours = this.hours - 12;
                } else {
                  this.timeStatus = "";
                }
                this.minute = this.timeObj.getMinutes().toString();
                this.chats.push(userenter + ' has joined');
                this.time.push(this.hours +":"+this.minute);
                this.timeLength = this.time.length;
                this.chatsLength = this.chats.length;
            });
        });
        this.socket.on(this.pkt.room + 'userleave', (userleave) => {
            this.ngzone.run(() => {
                this.timeObj = new Date();
                this.hours = this.timeObj.getHours().toString();
                if (this.hours >=1 && this.hours <= 12) {
                  this.timeStatus = "AM";
                } else if (this.hours > 12 && this.hours <= 24) {
                  this.timeStatus = "PM";
                  this.hours = this.hours - 12;
                } else {
                  this.timeStatus = "";
                }
                this.minute = this.timeObj.getMinutes().toString();
                this.chats.push(userleave + ' has left');
                this.time.push(this.hours+":"+this.minute);
                this.timeLength = this.time.length;
                this.chatsLength = this.chats.length;
                
            });
        });

      NativeStorage.getItem('userDetails').then(
        data => {
          this.userName = data.displayName;
          this.userPhoto = data.photoURL;
        },
        error => console.error(error)
      );
      
  }
  
  send(msg) {
      if ((<string> Network.connection === 'none') || (<string> Network.connection === 'ethernet')) {
        let alert = this.alertCtrl.create({
            title: "Something went wrong",
            subTitle: "There was a problem with network connection. Try again in another minutes ...",
            buttons: ["OK"]
        });
        alert.present();
      } else {
        if (msg != '') {
            this.pkt.data = msg;
            this.socket.emit('message', this.pkt);
        }
      this.chatinp = '';
      this.isUser = true;

    }
  }
    
  ionViewDidEnter(){
      this.pkt.data = this.userName;
      if(this.userName==null) {
        this.pkt.data = "Anonymous";
      }
      this.socket.emit('userentered', this.pkt);
  }
                         
  ionViewDidLeave(){
      this.pkt.data = this.userName;
      if(this.userName==null) {
        this.pkt.data = "User";
      }
      this.socket.emit('userleave', this.pkt);
  }

  ionViewDidLoad() {
    console.log('Hello Chatmessage Page');
    // this.messageTitle = this.navParams.get('messageTitle');
  }

}
