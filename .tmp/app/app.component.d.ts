import { Nav, Platform } from 'ionic-angular';
import { Api } from '../providers/api';
export declare class MyApp {
    private api;
    nav: Nav;
    rootPage: any;
    isHome: boolean;
    pages: any;
    constructor(platform: Platform, api: Api);
    openPage(page: any): void;
    openHome(): void;
}
