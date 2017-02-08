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

}
