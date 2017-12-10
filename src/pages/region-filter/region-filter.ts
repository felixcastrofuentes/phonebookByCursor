import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { WsregionProvider } from '../../providers/wsregion/wsregion';
import { Region } from '../../models/region';

/**
 * Generated class for the RegionFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-region-filter',
  templateUrl: 'region-filter.html',
})
export class RegionFilterPage {

  sRegion : any;
  sComuna : number[]=[];

  regiones: Region[];
  regionSelected : Region;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, private wsregionProvider: WsregionProvider) {
    let data = navParams.data;
    this.sRegion = data.sRegion;
    this.sComuna = data.sComuna;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltroRegionPage');
    this.getRegiones();
  }

  /**
   * Cierre modal
   */
  public closeModal(){

    let comunasArray : number[] = [];

    if(this.sRegion && this.sComuna.length == 0){
      for (let auxComuna of this.regionSelected.comunas) {
        comunasArray.push(auxComuna.id);
      }
    }
    else
    if(this.sRegion && this.sComuna.length > 0){
      for (let auxId of this.sComuna) {
        comunasArray.push(parseInt(auxId+""));
      }
    }

    let data = { 'sRegion': this.sRegion, 'sComuna': comunasArray };
    this.viewCtrl.dismiss(data);
  }

   /**
   * Obtiene regiones desde ws
   */
  getRegiones() {
    console.log("obteniendo regiones...");
    this.wsregionProvider.getRegiones()
      .subscribe(regiones => { 
        this.regiones = regiones;
        if(this.sRegion != null)
          this.setComunas();
      },
      err => {
        console.error("Error" + err.message);
      }
      , () => console.log('COMPLETEEEE')
      );
  }

  /**
   * Setea comunas en base a la región
   */
  setComunas(){
    //this.sComuna = [];
    for (let entry of this.regiones) {
        if(entry.id == this.sRegion){
          this.regionSelected = entry;
          this.sComuna = [];
          break;
        }
    }
  }

  /**
   * Limpia filtros
   */
  clearAction(){
    this.sComuna = [];
    this.sRegion = null;
    this.regionSelected = null;
    this.closeModal();
  }

}
