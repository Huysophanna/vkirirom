import { NavController, AlertController } from 'ionic-angular';
export declare class Membership {
    navCtrl: NavController;
    private alertCtrl;
    userProfile: any;
    userPoint: number;
    userName: any;
    userPhoto: any;
    userID: any;
    userCardType: any;
    userCardExpire: any;
    profilePicture: any;
    userData: any;
    constructor(navCtrl: NavController, alertCtrl: AlertController);
    pointSys(): void;
    warningAlert(title: any, message: any): void;
}
