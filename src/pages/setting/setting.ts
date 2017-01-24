import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SettingService } from '../../providers/setting-service';
import { NativeStorage } from 'ionic-native';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import { Toggle } from './toggle';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {  
  public dataObj = {
    location: true,
    notofication: true
  };
  public toggle: Toggle[];
  public loc = "location";
  public noti = "notification";

  constructor(public navCtrl: NavController, public settingService: SettingService, public alertCtrl: AlertController, private http: Http) {
    
  }

  ionViewWillEnter() {
    this.http.get('./toggle.json')
    .map(res => res.json())
    .subscribe((data) => {
      this.toggle = data;
      console.log("in observable :" + JSON.stringify(this.toggle));
    }, (err) => {
      console.error("Error" + err);
    });
  }

  getValue(k) {
    console.log("Get value" + k);
    this.http.delete('./toggle.json').subscribe((data) => {
      console.log("deleted" + data);
    }, (err) => {
      console.log("deletion error" + err);
    });
  }

  test() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(this.dataObj);

    this.http.put('./toggle.json', body, headers)
    .map(res => res.json())
    .subscribe((data) => {
      console.log("Put data " + data);
    }, (err) => {
      console.log("put error" + err);
    });
  }
  
}
