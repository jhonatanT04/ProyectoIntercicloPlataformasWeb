import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresServiceService {

  constructor() { }

  listaAdministradores: Persona[] =[]
  cargarAdmi(): Persona[] {
    const storedList = localStorage.getItem('listAdm');
    if (!storedList) {
      localStorage.setItem('listAdm', JSON.stringify([]));
      this.listaAdministradores = [];
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
  
}
