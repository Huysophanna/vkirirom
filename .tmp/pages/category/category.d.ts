import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api';
export declare class Category {
    navCtrl: NavController;
    private api;
    private params;
    title: any;
    constructor(navCtrl: NavController, api: Api, params: NavParams);
    ionViewDidLoad(): void;
}
