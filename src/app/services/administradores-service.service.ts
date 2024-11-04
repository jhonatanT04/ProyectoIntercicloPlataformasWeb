import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; import { Persona } from '../models/persona';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresServiceService {

  listaAdministradores: Persona[] = [];
  listaEspacios: any = [];
  listaContratos: any = [];
  listaTarifa: any = [];
  listaHorarios: any = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarAdmi();
    }
  }

  cargarAdmi(): Persona[] {
    if (isPlatformBrowser(this.platformId)) {
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
    }
    return this.listaAdministradores;
  }

  nuevoAdmi(adminstrador: Persona) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaAdministradores.push(adminstrador);
      localStorage.setItem('listAdm', JSON.stringify(this.listaAdministradores));
    }
  }

  eliminarAdmi(adminstrador: Persona) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.listaAdministradores.indexOf(adminstrador);
      if (index !== -1) {
        this.listaAdministradores.splice(index, 1);
        localStorage.setItem('listAdm', JSON.stringify(this.listaAdministradores));
      }
    }
  }

  agregarEspacio(nombre: string, tipo: string,estado:string) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaEspacios.push({ nombre, tipo ,estado});
      localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
    }
  }

  eliminarEspacio(espacio: any) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.listaEspacios.indexOf(espacio);
      if (index > -1) {
        this.listaEspacios.splice(index, 1);
        localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
      }
    }
  }

  cargarEspacios() {
    if (isPlatformBrowser(this.platformId)) {
      this.listaEspacios = JSON.parse(localStorage.getItem('listEspacios') || '[]');
    }
    return this.listaEspacios;
  }

  agregarContrato(nombreC: string, nombreE: string, duracion: number, tarifa: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaContratos.push({ nombreC, nombreE, duracion, tarifa });
      localStorage.setItem('listContratos', JSON.stringify(this.listaContratos));
  
      if (!this.listaEspacios || this.listaEspacios.length === 0) {
        this.listaEspacios = JSON.parse(localStorage.getItem('listEspacios') || '[]');
      }
  
      const espacio = this.listaEspacios.find((espacio: any) => espacio.nombre === nombreE);
      if (espacio) {
        espacio.estado = 'O';  
        localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
      }
    }
  } 

  eliminarContrato(contrato: any) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.listaContratos.indexOf(contrato);
      if (index > -1) {
        this.listaContratos.splice(index, 1);
        localStorage.setItem('listContratos', JSON.stringify(this.listaContratos));
        
        if (!this.listaEspacios || this.listaEspacios.length === 0) {
          this.listaEspacios = JSON.parse(localStorage.getItem('listEspacios') || '[]');
        }
  
        const espacio = this.listaEspacios.find((e: any) => e.nombre === contrato.nombreE);
        if (espacio) {
          espacio.estado = 'D';
          localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
        }
      }
    }
  }
  

  cargarContratos() {
    if (isPlatformBrowser(this.platformId)) {
      this.listaContratos = JSON.parse(localStorage.getItem('listContratos') || '[]');
    }
    return this.listaContratos;
  }

  agregarTarifa(tipo: string, costo: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaTarifa.push({ tipo, costo });
      localStorage.setItem('listTarifas', JSON.stringify(this.listaTarifa));
    }
  }

  eliminarTarifa(tarifa: any) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.listaTarifa.indexOf(tarifa);
      if (index > -1) {
        this.listaTarifa.splice(index, 1);
        localStorage.setItem('listTarifas', JSON.stringify(this.listaTarifa));
      }
    }
  }

  cargarTarifa() {
    if (isPlatformBrowser(this.platformId)) {
      this.listaTarifa = JSON.parse(localStorage.getItem('listTarifas') || '[]');
    }
    return this.listaTarifa;
  }

  agrgarHorario(dia: string, horaA: string, horaC: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaHorarios.push({ dia, horaA, horaC });
      localStorage.setItem('listHorarios', JSON.stringify(this.listaHorarios));
    }
  }

  eliminarHorario(horario: any) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.listaHorarios.indexOf(horario);
      if (index > -1) {
        this.listaHorarios.splice(index, 1);
        localStorage.setItem('listHorarios', JSON.stringify(this.listaHorarios));
      }
    }
  }

  cargarHorario() {
    if (isPlatformBrowser(this.platformId)) {
      this.listaHorarios = JSON.parse(localStorage.getItem('listHorarios') || '[]');
    }
    return this.listaHorarios;
  }
}