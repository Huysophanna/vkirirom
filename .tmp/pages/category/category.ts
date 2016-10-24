import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api';

/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class Category {
  title:any;
  constructor(
    public navCtrl: NavController,
    private api: Api,
    private params: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('Hello Category Page');
    this.title = this.params.data.title;
  }

}
