import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresServiceService {

  constructor() {
    this.cargarAdmi()
   }

  listaAdministradores: Persona[] =[]
  cargarAdmi(): Persona[] {
    const storedList = localStorage.getItem('listAdm');
    if (!storedList || JSON.parse(storedList).length === 0) {
      const administradorPorDefecto = new Persona(
        'admin@example.com',     
        'admin123',               
        'Admin',                  
        'Principal',              
        '123456789',              
        '123 Calle Falsa',        
        'ADM001',                 
        'Ecuador',                
        'Quito',                  
        true                      
      );
      this.listaAdministradores = [administradorPorDefecto];
      localStorage.setItem('listAdm', JSON.stringify(this.listaAdministradores));
    } else {
      this.listaAdministradores = JSON.parse(storedList);
    }
    return this.listaAdministradores;
  }
  nuevoAdmi(adminstrador:Persona) {
    let cur = {  }
    this.listaAdministradores.push(adminstrador);
    localStorage.setItem('listAdm', JSON.stringify(this.listaAdministradores))
  }
  eliminarAdmi(adminstrador:Persona) {
    const index = this.listaAdministradores.indexOf(adminstrador);
    if (index !== -1) {
      this.listaAdministradores.splice(index, 1);
      console.log(this.listaAdministradores)
      localStorage.setItem('listAdm', JSON.stringify(this.listaAdministradores));
    }
  }
  
  listaEspacios: any =[]

  agregarEspacio(nombre:string,tipo:string){
    this.listaEspacios.push({nombre,tipo})
    localStorage.setItem('listEspacios',JSON.stringify(this.listaEspacios)) 
  }

  eliminarEspacio(espacio:any){
    const index = this.listaEspacios.indexOf(espacio)
    if(index>-1){
      this.listaEspacios.splice(index,1)
    } 
    localStorage.setItem('listEspacios',JSON.stringify(this.listaEspacios))
  }

  cargarEspacios(){
    return this.listaEspacios
  }

  listaContratos: any =[]

  agregarContrato(nombreC:string,nombreE:string,duracion:number,tarifa:number){
    this.listaContratos.push({nombreC,nombreE,duracion,tarifa})
    localStorage.setItem('listContratos',JSON.stringify(this.listaContratos))
  }

  eliminarContrato(contrato:any){
    const index = this.listaContratos.indexOf(contrato)
    if(index>-1){
      this.listaContratos.splice(index,1)
    } 
    localStorage.setItem('listContratos',JSON.stringify(this.listaEspacios))
  }

  cargarContratos(){
    return this.listaContratos
  }

  listaTarifa: any=[]
  agregarTarifa(tipo:string,costo:number){
    this.listaTarifa.push({tipo,costo})
    localStorage.setItem('listTarifas',JSON.stringify(this.listaTarifa))
  }  

  eliminarTarifa(tarifa:any){
    const index = this.listaTarifa.indexOf(tarifa)
    if(index>-1){
      this.listaTarifa.splice(index,1)
    } 
    localStorage.setItem('listTarifas',JSON.stringify(this.listaEspacios))
  }

  cargarTarifa(){
    return this.listaTarifa
  }

  listaHorarios:any =[]

  agrgarHorario(){}
}
