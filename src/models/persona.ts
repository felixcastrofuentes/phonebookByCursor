import { Direccion } from './direccion';

export class Persona {
  
  id: number;
  nombre: string;
  apellido : string;
  telefono : number;
  rut : string;
  activo : boolean;
  direccion : Direccion;
}