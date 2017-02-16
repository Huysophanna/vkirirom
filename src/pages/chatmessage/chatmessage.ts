import { Component, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Events, ViewController, PopoverController, NavController, Content, Platform, AlertController} from 'ionic-angular';
import { NativeStorage, Network, Keyboard } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
declare var io: any;
declare var window: any;

@Component({
  selector: 'page-chatmessage',
  templateUrl: 'chatmessage.html'
})
export class Chatmessage implements AfterViewInit {
   @ViewChild('scrollMe') myScrollContainer: ElementRef;
   @ViewChild('chatinput') chatinput: ElementRef;

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
  checkConnection: any;
  connectionStatus: any;
  token: any;
  checkKeyboardValue = false;
  keyboardSubscribe: any; 
  chatContentHeight: any;
  chatInputHeight: any;
  keyboardShownValue: any;
  i=0;
  notificationType: any;
  settingToggleNotification: any;


  constructor(public events: Events, public popoverCtrl: PopoverController, private navCtrl: NavController, public ngzone: NgZone, private platform: Platform, private alertCtrl: AlertController) {
        Keyboard.disableScroll(true);
        this.checkNetworkConnection();

        this.keyboardSubscribe = Keyboard.onKeyboardShow().subscribe((success) => {
          let CONST_FIX_VALUE = 100;
          this.keyboardShownValue = this.chatContentHeight + this.chatInputHeight - success.keyboardHeight - CONST_FIX_VALUE;
            this.ngzone.run(() => {
              this.checkKeyboardValue = true;
            });
        });
        this.keyboardSubscribe = Keyboard.onKeyboardHide().subscribe((success) => {
            this.ngzone.run(() => {
              this.checkKeyboardValue = false;
            });  
        });

        // NativeStorage.getItem('userDetails')
        //   .then(
        //     data => {
        //       this.userName = data.displayName;
        //     },
        //     error => console.error(error)
        // );

        NativeStorage.getItem('deviceToken')
          .then(
            data => {
              this.token = data;
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
            deviceToken: '',
            room: 'room1'
        };
        this.time = [];
        this.socket = io.connect('http://110.74.203.152:3000');

        this.socket.on('chatHistory', (chatData) => {
            this.chatHistory = chatData;
        });
        
        // called when the user send thier message
        this.socket.on(this.pkt.room + 'message', (data) => {
            this.ngzone.run(() => {
              this.timeAdjustment(); // used for time adjustment
              this.chats.push(data);
              this.time.push(this.hours +":"+ this.minute);    
              this.timeLength = this.time.length;
              this.chatsLength = this.chats.length;
            });
            this.checkNetworkConnection();
        }); 

        // called when the user enter the chat room
        this.socket.on(this.pkt.room + 'userentered', (userenter) => {
            this.isJoined = true;
            this.ngzone.run(() => {
                this.timeAdjustment(); // used for time adjustment
                this.chats.push(userenter);
                this.time.push(this.hours +":"+this.minute);
                this.timeLength = this.time.length;
                this.chatsLength = this.chats.length;
                console.log(this.pkt.deviceToken);
                console.log(this.pkt.username);
                //this is used to show whether the notification of user is set to ON or OFF from server
                if ((userenter.username==this.pkt.username) && (userenter.tag == false)) {
                  this.notificationType = "ON";
                } else if ((userenter.username==this.pkt.username) && (userenter.tag == true)) {
                  this.notificationType = "OFF";
                }

            });
            console.log(userenter.tag);
            
        });

        // called when the user leave the chat room
        this.socket.on(this.pkt.room + 'userleave', (userleave) => {
            this.ngzone.run(() => {
                this.timeAdjustment(); // used for time adjustment
                this.chats.push(userleave);
                this.time.push(this.hours+":"+this.minute);
                this.timeLength = this.time.length;
                this.chatsLength = this.chats.length;
                
            });
        });

        // called when the user turn off notification
        this.socket.on('userNotification', () => {
            
        });

      // store user data to local storage
      NativeStorage.getItem('userDetails').then(
        data => {
          this.userName = data.displayName;
        },
        error => console.error(error)
      );
      NativeStorage.getItem('userPhoto').then(
        photo => {
          this.userPhoto = photo
        }
      );

      NativeStorage.getItem('settingToggleNotification').then(_data => {
        this.settingToggleNotification = _data;
      });
      
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

  ngAfterContentChecked() {
    if (this.chatHistory!='') {
      //let it checks for 5 times only and scroll chat content to bottom
      if (this.i<5) {
        this.scrollToBottom();
      } this.i++;
    } 
  }

  ngAfterViewInit() {
    //set value when keyboard is shown
    this.chatContentHeight = this.myScrollContainer.nativeElement.offsetHeight;
    this.chatInputHeight = this.chatinput.nativeElement.offsetHeight;
    console.log(this.chatContentHeight + 'px '+ ' =>  ' + this.chatInputHeight + 'px');
  }
  
  // called when user send thier message
  send(msg) {
      if ((<string> Network.connection === 'none')) {
        let alert = this.alertCtrl.create({
            title: "Something went wrong",
            subTitle: "There was a problem with network connection. Please make sure you have internet access and try again in another minutes ...",
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
            this.pkt.deviceToken = this.token;
            this.socket.emit('message', this.pkt);
            this.scrollToBottom();
        }
      }
      this.chatinp = '';
      this.isUser = true;
    }
  
  // ionic life cycle function called when user enter

  notificationOff() {
    let alert = this.alertCtrl.create({
        title: "Mute Notification",
        message: "Are you sure to mute incoming alert notification for the chat messages?",
        buttons: [{
            text: 'Cancel',
            role: 'cancel'
          }, {
            text: "Confirm",
            handler: confirm => {
              let data = {
                username: this.userName,
                token: this.token,
                tag: false
              }
              //this code is to update the button type in view
              this.ngzone.run(()=> {
                this.notificationType = "ON";
              })
              this.socket.emit('userNotification', data);
          }
        }]
    });
    alert.present();
  }
  notificationOn() {
    let alert = this.alertCtrl.create({
        title: "Turn On Notification",
        message: "Are you sure to turn on incoming alert notification for the chat messages?",
        buttons: [{
            text: 'Cancel',
            role: 'cancel'
          }, {
            text: "Confirm",
            handler: confirm => {
              let data = {
                username: this.userName,
                token: this.token,
                tag: true
              }
              //this code is to update the button type in view
              this.ngzone.run(()=> {
                this.notificationType = "OFF";
              })
              this.socket.emit('userNotification', data);
          }
        }]
    });
    alert.present();
  }
  
  ionViewDidEnter(){
    console.log("enteruser");
      if(this.userName==null) {
          this.userName = "Anonymous";
      }
      this.pkt.status = this.userName  + ' has joined';
      this.pkt.username = this.userName;
      this.pkt.deviceToken = this.token;
      this.socket.emit('userentered', this.pkt);

      //emit events to turn off alert push notification
      this.events.publish("isChatMessageScreen", "true");
  }

  // ionic life cycle function called when the user leave
  ionViewDidLeave(){
      this.pkt.status = this.userName  + ' has left';
      this.pkt.username = this.userName;
      
      this.socket.emit('userleave', this.pkt);

      //emit events to turn off alert push notification
      this.events.publish("isChatMessageScreen", "false");

  }

  checkNetworkConnection() {
    if ((<string> Network.connection === 'none')) {
        this.connectionStatus = "No internet";
    } else {
        this.connectionStatus = "";
    }
  }

  scrollToBottom() {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}