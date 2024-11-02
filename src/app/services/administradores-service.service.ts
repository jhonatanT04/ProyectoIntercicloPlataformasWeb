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
  
}
