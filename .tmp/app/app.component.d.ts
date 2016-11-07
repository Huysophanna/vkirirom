import { Nav, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Push } from '@ionic/cloud-angular';
export declare class MyApp {
    loadingCtrl: LoadingController;
    storage: Storage;
    push: Push;
    nav: Nav;
    rootPage: any;
    isHome: boolean;
    pages: any;
    authData: any;
    loading: any;
    constructor(platform: Platform, loadingCtrl: LoadingController, storage: Storage, push: Push);
    openPage(page: any): void;
    openHome(): void;
}
