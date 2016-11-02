import { Nav, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
export declare class MyApp {
    loadingCtrl: LoadingController;
    storage: Storage;
    nav: Nav;
    rootPage: any;
    isHome: boolean;
    pages: any;
    authData: any;
    loading: any;
    constructor(platform: Platform, loadingCtrl: LoadingController, storage: Storage);
    openPage(page: any): void;
    openHome(): void;
}
