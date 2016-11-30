import { Component, NgZone, ViewChild } from '@angular/core';
<<<<<<< HEAD
import { NavController, Content, Platform, AlertController} from 'ionic-angular';
import { NativeStorage, Network } from 'ionic-native';
=======
import { NavController, Content } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import {Observable} from 'rxjs/Observable';
>>>>>>> 704df27e4bcbdaa7d381dafef2fef5105dddfe75
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
        console.log(this.timeObj);       
        console.log("run");
        this.socket.on(this.pkt.room + 'message', (msg) => {
          // this.test = new Date();
          console.log("runn1");
          this.ngzone.run(() => {
            console.log("run1");
            this.chats.push(msg);
            this.time.push(this.timeObj = new Date());
            this.timeLength = this.time.length;
            this.chatsLength = this.chats.length;
            console.log(this.time);
            if (this.isUser == true) {
              console.log("This is me !!!!");
            } else {
              console.log("Not me");
            }
            
            // this.userStatus.push(msg);
            this.content.scrollToBottom();
          });
          
        }); 
        this.socket.on(this.pkt.room + 'userentered', (userenter) => {
          console.log("run2");
            this.ngzone.run(() => {
                this.chats.push(userenter + ' has joined');
                this.time.push(this.timeObj = new Date());
                this.timeLength = this.time.length;
                this.chatsLength = this.chats.length;
                console.log("run2");
                console.log(this.time);
                
            });
        });
        this.socket.on(this.pkt.room + 'userleave', (userleave) => {
          console.log("run3");
            this.ngzone.run(() => {
                this.chats.push(userleave + ' has left');
                this.time.push(this.timeObj = new Date());
                this.timeLength = this.time.length;
                this.chatsLength = this.chats.length;
                console.log("run3");
                console.log(this.time);
                
            });
        });

      NativeStorage.getItem('userDetails').then(
        data => {
          console.log("runstorage");
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
            console.log("sms send");
        }
        this.chatinp = '';
      }
      this.isUser = true;
  }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, 1000);
  // }
    
  ionViewDidEnter(){
    console.log("enteruser");
      this.pkt.data = this.userName;
      if(this.userName==null) {
        this.pkt.data = "Anonymous"
      } else {
        this.pkt.data = this.userName
      }
      this.socket.emit('userentered', this.pkt);
      console.log("enteruser");
  }
                         
  ionViewDidLeave(){
      this.pkt.data = this.userName;
      if(this.userName==null) {
        this.pkt.data = "User"
      }
      this.socket.emit('userleave', this.pkt);
      console.log("userleave");
  }

  ionViewDidLoad() {
    console.log('Hello Chatmessage Page');
    // this.messageTitle = this.navParams.get('messageTitle');
  }

}
