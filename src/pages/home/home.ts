import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { WspersonaProvider } from '../../providers/wspersona/wspersona';
import { Persona } from '../../models/persona';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  personas: Persona[];
  personasFilter: Persona[] = [];
  refresher = null;
  searchQuery: string = '';

  constructor(public navCtrl: NavController, private wspersonaProvider: WspersonaProvider, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonaDetallePage');
    this.getPersonas();
  }

  /**
   * Obtiene personas desde ws
   */
  getPersonas() {
    console.log("obteniendo personas...");
    this.wspersonaProvider.getPersonas()
      .subscribe(personas => { this.personas = personas },
      err => {
        console.error("Error" + err.message);
        if (this.refresher)
          this.refresher.complete();
      }
      , () => {
        console.log('COMPLETEEEE');
        this.initializeItems();
        if (this.refresher)
          this.refresher.complete();

      }
      );
  }


  /**
   * Refresh ionic
   */
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.refresher = refresher;
    this.getPersonas();
  }

  /**
   * Se inicializan items de personas para lista
   */
  initializeItems() {
    this.personasFilter = [];

    for (let entry of this.personas) {
      if(entry.activo == true){
        this.personasFilter.push(entry);
      }
    }
  }

  /**
   * Filtra los items
   */
  filterItems(ev) {
        this.initializeItems();
        let val = ev.target.value;
        if (val && val.trim() !== '') {
            this.personasFilter = this.personasFilter.filter(function(item) {
              if (item.apellido  && item.nombre)
                return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.apellido.toLowerCase().indexOf(val.toLowerCase()) > -1;
              else
              if (item.apellido)
                return item.apellido.toLowerCase().indexOf(val.toLowerCase()) > -1;
              else
                return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
            });
        }
    }
}
