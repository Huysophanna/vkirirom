import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
export declare class Api {
    http: Http;
    constructor(http: Http);
}
