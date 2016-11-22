import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
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
  chats: any;
  chatinp: any;
  pkt: any;
  socket: any;
  userName: any;
  userPhoto: any;
  messageTitle: any;
  constructor(public navCtrl: NavController, public ngzone: NgZone) {
        this.ngzone = new NgZone({enableLongStackTrace: false});
        this.chats = [];
        this.chatinp ='';
        this.pkt = {
            data: '',
            room: 'room1'
        };
        this.socket = io.connect('http://110.74.203.152:3000');
        console.log("run");
        this.socket.on(this.pkt.room + 'message', (msg) => {
          console.log("runn1");
          this.ngzone.run(() => {
            console.log("run1");
            this.chats.push(msg);
            this.content.scrollToBottom();
            
          });
          
        }); 
        this.socket.on(this.pkt.room + 'userentered', (user) => {
          console.log("run2");
            this.ngzone.run(() => {
                this.chats.push(user + ' has joined');
                console.log("run2");
            });
        });
        this.socket.on(this.pkt.room + 'userleave', (user) => {
          console.log("run3");
            this.ngzone.run(() => {
                this.chats.push(user + ' has left');
                console.log("run3");
            });
        });

      NativeStorage.getItem('userDetails').then(
        data => {
          this.userName = data.displayName;
          this.userPhoto = data.photoURL;
          console.log("runstorage");
        },
        error => console.error(error)
      );
      console.log("runend");
  }
  
  send(msg) {
      if(msg != ''){
          this.pkt.data = msg;
          this.socket.emit('message', this.pkt);
          console.log("sms send");
      }
      this.chatinp = '';
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
        this.pkt.data = "User"
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
