import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api {

  constructor(public http: Http) {
    console.log('Hello Api Provider');
  }

  category(){
    return this.http.get('http://localhost/ionWordpress/wp-json/wp/v2/categories')
    .toPromise()
    .then(data => data.json());
  }

  posts_category(id, page){
    return this.http.get("http://localhost/ionWordpress/wp-json/wp/v2/posts?_embed&categories="+id+"&filter[order]=DESC&filter[posts_per_page]=5&page="+page)
            .toPromise()
            .then(data => data.json)
  }

}
