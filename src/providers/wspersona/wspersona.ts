import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Persona } from '../../models/persona';

/*
  Generated class for the WspersonaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WspersonaProvider {

  apiEndPoint = "https://private-d80e7-phonebooktest.apiary-mock.com";


  constructor(public http: HttpClient) {
    //console.log('Hello WspersonaProvider Provider');
  }

  /**
   * Obtiene Array de objetos del tipo Persona
   */
  public getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiEndPoint + "/persona");
  }

  /*
  public getPersona(persona:Persona){

  }

  public addPersona(persona:Persona){

  }

  public deletePersona(persona:Persona){

  }
  */
}
