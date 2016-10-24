import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
export declare class Api {
    http: Http;
    constructor(http: Http);
    category(): Promise<any>;
    posts_category(id: any, page: any): Promise<() => any>;
}
