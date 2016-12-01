import { NavController } from 'ionic-angular';
export declare class Membership {
    navCtrl: NavController;
    userPoint: number;
    userName: any;
    userPhoto: any;
    userID: any;
    userCardType: any;
    userCardExpire: any;
    profilePicture: any;
    userData: any;
    constructor(navCtrl: NavController);
    ionViewDidLoad(): void;
    pointSys(): void;
}
