import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import { Persona } from '../../models/persona';
//import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { MsisdnValidator } from '../../validators/msisdn-validator';

/**
 * Generated class for the PersonaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-persona-detail',
  templateUrl: 'persona-detail.html',
})
export class PersonaDetailPage {

  persona: Persona;
  validMsisdn=true;
  validRut=true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController ) {
    let data = navParams.data;
    this.persona = data.persona;
  }

  ionViewDidLoad() {
    this.validMsisdn = this.isPhone(this.persona.telefono);
    if(!this.validMsisdn) this.presentToast("Teléfono: "+this.persona.telefono+" es inválido...");
    this.validRut = this.isRut(this.persona.rut);
    if(!this.validRut) this.presentToast("RUT: "+this.persona.rut+" es inválido...");
  }


  /**
   * Valida Teéfono 11 dígitos
   */
  isPhone(msisdn: any) {
    console.log("isValidMobile:"+msisdn);
    let regExp = /^[0-9]{11}$/;
    if (!regExp.test(msisdn)) {
      return false;
    }
    return true;
  }

  /**
   * Valida RUT
   */
  isRut(rutCompleto:string) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (this.rutDv(rut) == digv );
  }
  

	rutDv(T:any){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
  }
  
  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
