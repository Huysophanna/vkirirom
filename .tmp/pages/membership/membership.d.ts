import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
export declare class Membership {
    navCtrl: NavController;
    storage: Storage;
    point: number;
    userName: any;
    userPhoto: any;
    profilePicture: any;
    constructor(navCtrl: NavController, storage: Storage);
    ionViewDidLoad(): void;
    pointSys(): void;
}
