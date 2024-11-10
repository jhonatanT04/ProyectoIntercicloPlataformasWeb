import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; import { Persona } from '../models/persona';
import { isPlatformBrowser } from '@angular/common';
import { Espacio } from '../models/espacio';
import { Contrato } from '../models/contrato';
import { Tarifa } from '../models/tarifa';
import { Horario } from '../models/horario';

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

  buscarAdminPorEmail(email: string): Persona | null {
    const admin = this.listaAdministradores.find(adm => adm.email === email);
    return admin ? admin : null;
  }
  
  buscarContratoPorEmail(email: string): Contrato | null {
    const contrato = this.listaContratos.find((contrato: any) => contrato.cliente.email === email);
    return contrato ? contrato : null; 
  }

  buscarListaContratosPorEmail(email: string): Contrato[] {
    const contratosFiltrados = this.listaContratos.filter((contrato: any) => contrato.cliente.email === email);
    return contratosFiltrados;  
  }
  actualizarContratosCliente(email: string, nuevosDatos: Partial<Persona>): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.listaContratos = this.cargarContratos();
      const contratosCliente = this.listaContratos.filter((contrato: any) => contrato.cliente.email === email);
      if (contratosCliente.length > 0) {
        contratosCliente.forEach((contrato: any) => {
          contrato.cliente = { 
            ...contrato.cliente, 
            ...nuevosDatos 
          };
        });
        localStorage.setItem('listContratos', JSON.stringify(this.listaContratos));
        return true;
      }
    }
    return false;
  }
  
  agregarEspacio(espacio: Espacio) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaEspacios.push(espacio);
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

  agregarContrato(contrato:Contrato,nombreE:string) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaContratos.push(contrato);
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

  agregarTarifa(tarifa:Tarifa) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaTarifa.push(tarifa);
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

  agrgarHorario(horario:Horario) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaHorarios.push(horario);
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