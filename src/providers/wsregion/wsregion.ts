import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Region } from '../../models/region';
/*
  Generated class for the WsregionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WsregionProvider {
  apiEndPoint = "https://private-d80e7-phonebooktest.apiary-mock.com";

  constructor(public http: HttpClient) {
    //console.log('Hello WsregionProvider Provider');
  }

  /**
   * Obtiene Array de objetos del tipo Region
   */
  public getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiEndPoint + "/region");
  }

}
