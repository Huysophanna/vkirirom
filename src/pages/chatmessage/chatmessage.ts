import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content, Platform, AlertController} from 'ionic-angular';
import { NativeStorage, Network } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
declare var io: any;

/*
  Generated class for the Chatmessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chatmessage',
  templateUrl: 'chatmessage.html',
  queries: {
    content: new ViewChild(Content)
  }
})
export class Chatmessage {
  @ViewChild(Content) content: Content;
  static get parameters() {
    return [NgZone];
  }
  
  isJoined: boolean;
  timeStatus: string;
  hours: any;
  minute: any;
  isUser: boolean;
  chatsLength: number;
  timeLength: number;
  time: any;
  timeObj: any;
  currentTimeAndStatus: any;
  year: any; month: any; date: any; day: any;
  chats: any = [];
  chatHistory: any = [];
  chatinp: any;
  pkt: any;
  socket: any;
  userName: any;
  userPhoto: any = 'https://s-media-cache-ak0.pinimg.com/564x/20/f2/40/20f240398d8d8235e9b30bdb9b0212a3.jpg';
  messageTitle: any;
  userStatus: any;

  constructor(public navCtrl: NavController, public ngzone: NgZone, private platform: Platform, private alertCtrl: AlertController) {
        NativeStorage.getItem('userDetails')
          .then(
            data => {
              this.userName = data.displayName;
            },
            error => console.error(error)
        );

        this.isUser = false;
        this.ngzone = new NgZone({enableLongStackTrace: false});
        this.userStatus = [];
        this.chatinp ='';
        this.pkt = {
            message: '',
            username: '',
            photo: '',
            status: '',
            time: '',
            year: '',
            month: '',
            date: '',
            day: '',
            room: 'room1'
        };
        this.time = [];
        this.socket = io.connect('http://110.74.203.152:3000');
        // console.log(this.timeObj);

        this.socket.on('chatHistory', (chatData) => {
            // this.chats.push(chatData);
            this.chatHistory = chatData;
            console.log(this.chatHistory);
            console.log(chatData);
            
            
            
        });
        
        // called when the user send thier message
        this.socket.on(this.pkt.room + 'message', (data) => {
            this.isJoined = false;
            this.ngzone.run(() => {
              this.timeAdjustment(); // used for time adjustment
              this.chats.push(data);
              this.time.push(this.hours +":"+ this.minute);    
              this.timeLength = this.time.length;
              this.chatsLength = this.chats.length;
          });
          
        }); 

        // called when the user enter the chat room
        this.socket.on(this.pkt.room + 'userentered', (userenter) => {
            this.isJoined = true;
            this.ngzone.run(() => {
                this.timeAdjustment(); // used for time adjustment
                this.chats.push(userenter);
                console.log(userenter);          
                this.time.push(this.hours +":"+this.minute);
                this.timeLength = this.time.length;
                this.chatsLength = this.chats.length;
            });
        });

        // called when the user leave the chat room
        this.socket.on(this.pkt.room + 'userleave', (userleave) => {
            this.isJoined = true;
            this.ngzone.run(() => {
                this.timeAdjustment(); // used for time adjustment
                this.chats.push(userleave);
                this.time.push(this.hours+":"+this.minute);
                this.timeLength = this.time.length;
                this.chatsLength = this.chats.length;
                
            });
        });

      // store user data to local storage
      NativeStorage.getItem('userDetails').then(
        data => {
          this.userName = data.displayName;
          this.userPhoto = data.photoURL;
        },
        error => console.error(error)
      );
      
  }

  // Function used for time adjustment
  timeAdjustment() {
    this.timeObj = new Date();

    this.hours = this.timeObj.getHours().toString();
    if (this.hours >= 1 && this.hours <= 12) {
      this.timeStatus = " AM";
    } else if (this.hours > 12 && this.hours <= 24) {
        this.timeStatus = " PM";
        this.hours = this.hours - 12;
    } else {
        this.timeStatus = "";
    }
    this.minute = this.timeObj.getMinutes().toString();
    if (this.minute < 10) {
      this.minute = "0" + this.minute;
    }

    //get date for pushing to mongodb
    this.year = this.timeObj.getFullYear();
    this.month = this.timeObj.getMonth() + 1;
    this.day = this.timeObj.getDay();
    this.date = this.timeObj.getDate();

    switch (this.day) {
      case 0: this.day = "Sun";
        break;
      case 1: this.day = "Mon";
        break;
      case 2: this.day = "Tue";
        break;
      case 3: this.day = "Wed";
        break;
      case 4: this.day = "Thu";
        break;
      case 5: this.day = "Fri";
        break;
      case 6: this.day = "Sat";
        break;
    }

    switch (this.month) {
      case 1: this.month = "Jan";
        break;
      case 2: this.month = "Feb";
        break;
      case 3: this.month = "Mar";
        break;
      case 4: this.month = "Apr";
        break;
      case 5: this.month = "May";
        break;
      case 6: this.month = "Jun";
        break;
      case 7: this.month = "Jul";
        break;
      case 8: this.month = "Aug";
        break;
      case 9: this.month = "Sep";
        break;
      case 10: this.month = "Oct";
        break;
      case 11: this.month = "Nov";
        break;
      case 12: this.month = "Dec";
        break;
    }

    //append time with status
    this.currentTimeAndStatus = this.hours +':'+ this.minute + this.timeStatus; 
  }
  
  // called when user send thier message
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
            this.pkt.message = msg;
            this.pkt.photo = this.userPhoto;
            this.pkt.time = this.currentTimeAndStatus;
            this.pkt.year = this.year;
            this.pkt.month = this.month;
            this.pkt.date = this.date;
            this.pkt.day = this.day;
            this.socket.emit('message', this.pkt);
        }
      }
      this.chatinp = '';
      this.isUser = true;
    }

  ngAfterViewInit() {
     let dimensions = this.content.getContentDimensions();
     this.content.scrollTo(0, dimensions.scrollBottom, 0);
  }
  
  // ionic life cycle function called when user enter
  ionViewDidEnter(){
    console.log("enteruser");
      this.pkt.status = this.userName  + ' has joined';
      this.pkt.username = this.userName;
      if(this.userName==null) {
        this.pkt.username = "Anonymous";
        this.pkt.status = "Anonymous"  + ' has joined';
      }
      
      this.socket.emit('userentered', this.pkt);
  }

  // ionic life cycle function called when the user leave
  ionViewDidLeave(){
      this.pkt.status = this.userName  + ' has left';
      this.pkt.username = this.userName;
      if(this.userName==null) {
        this.pkt.username = "Anonymous";
        this.pkt.status = "Anonymous"  + ' has left';
      }
      this.socket.emit('userleave', this.pkt);
  }

  // ionic life cycle function called when the page is being loaded
  ionViewDidLoad() {
    console.log('Hello Chatmessage Page');
  }

}
