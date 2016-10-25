import { Nav, Platform, LoadingController } from 'ionic-angular';
export declare class MyApp {
    loadingCtrl: LoadingController;
    nav: Nav;
    rootPage: any;
    isHome: boolean;
    pages: any;
    authData: any;
    loading: any;
    constructor(platform: Platform, loadingCtrl: LoadingController);
    openPage(page: any): void;
    openHome(): void;
}
