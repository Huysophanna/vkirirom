import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
export declare class Membership {
    navCtrl: NavController;
    storage: Storage;
    point: any;
    userName: any;
    userPhoto: any;
    constructor(navCtrl: NavController, storage: Storage);
    ionViewDidLoad(): void;
    pointSys(): void;
}
