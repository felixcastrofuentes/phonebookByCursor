import { Component } from '@angular/core';
import { NavController, ModalController , ToastController} from 'ionic-angular';

import { WspersonaProvider } from '../../providers/wspersona/wspersona';
import { Persona } from '../../models/persona';

import { PersonaDetailPage } from '../persona-detail/persona-detail';
import { RegionFilterPage } from '../region-filter/region-filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  personas: Persona[]= [];
  personasFilter: Persona[] = [];
  refresher = null;
  searchQuery: string = '';

  regionSelected:number = null;
  comunasSelected:number[] = null;

  constructor(public navCtrl: NavController, private wspersonaProvider: WspersonaProvider, public modalCtrl: ModalController, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PersonaDetallePage');
    this.getPersonas();
  }

  /**
   * Obtiene personas desde ws
   */
  getPersonas() {
    this.wspersonaProvider.getPersonas()
      .subscribe(personas => { this.personas = personas },
      err => {
        this.presentToast("Ups! No hemos podido listar el phonebook. Intenta más tarde por favor.");
        if (this.refresher)
          this.refresher.complete();
      }
      , () => {
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
    this.refresher = refresher;
    this.getPersonas();
  }

  /**
   * Se inicializan items de personas para lista
   */
  initializeItems() {
    this.personasFilter = [];
    for (let entry of this.personas) {
      if(this.regionSelected && this.comunasSelected && entry.activo == true){
          if(this.comunasSelected.indexOf(entry.direccion.comuna.id) > -1)
            this.personasFilter.push(entry);
      }
      else
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


  /**
   * Abre página persona-detail
   */
  personaDetailAction(persona: Persona) {
    this.navCtrl.push(PersonaDetailPage, { "persona": persona });
  }

  /**
   * Abre página region-filter del tipo Modal (filtro region + comunas)
   */
  regionFilterAction() {
    let data = { 'sRegion': this.regionSelected, 'sComuna': this.comunasSelected };

     let modal = this.modalCtrl.create(RegionFilterPage, data );
        modal.present();
        modal.onDidDismiss((data) => {
            if (data) {
              this.regionSelected = data.sRegion;
              this.comunasSelected = data.sComuna;
              this.initializeItems();
            }
        });
  }

  /**
   * Muestra mensaje tipo Toast
   */
  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
