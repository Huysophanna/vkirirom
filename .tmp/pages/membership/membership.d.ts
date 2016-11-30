import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
export declare class Membership {
    navCtrl: NavController;
    private angFire;
    point: number;
    userName: any;
    userPhoto: any;
    profilePicture: any;
    users: FirebaseListObservable<any>;
    constructor(navCtrl: NavController, angFire: AngularFire);
    ionViewDidLoad(): void;
    pointSys(): void;
}
