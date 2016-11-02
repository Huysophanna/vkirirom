import { NavController } from 'ionic-angular';
import { Membership } from '../membership/membership';
export declare class Dashboard {
    navCtrl: NavController;
    membership: typeof Membership;
    constructor(navCtrl: NavController);
    navigate(): void;
    sos(): void;
    ionViewDidLoad(): void;
}
