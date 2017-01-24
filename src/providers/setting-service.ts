import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from 'ionic-native';

@Injectable()
export class SettingService {
  public isLocation: boolean;
  public isNotification: boolean;

  constructor(public http: Http) {
    console.log('Hello SettingService Provider');
  }

  public setSetting(val, switchval) {
    switch(switchval) {
      case 1:
        NativeStorage.setItem('location', val).then(() => {
          alert("location stored");
        }, (Error) => {
          alert("Error storing location :" + Error);
        });
      break;

      case 2:
        NativeStorage.setItem('notification', val).then(() => {
          alert("notification stored");
        }, (Error) => {
          alert("Error storing notification :" + Error);
        })
      break;
    }
  }

}
