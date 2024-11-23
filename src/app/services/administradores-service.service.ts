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
  listaEspacios: Espacio[] = [
    { nombre: 'Auto', estado: 'D',total: 30},
    { nombre: 'Moto', estado: 'D',total: 20}
  ];
  
  listaContratos: any = [];
  listaTarifa: any = [
    { tiempo: '30 minutos', costo: 0.50 },
    { tiempo: '1 hora', costo: 1.00 },
    { tiempo: '2 horas', costo: 1.80 },
    { tiempo: '3 horas', costo: 2.50 },
    { tiempo: 'Medio día (6 horas)', costo: 4.50 },
    { tiempo: 'Día completo (12 horas)', costo: 8.00 },
    { tiempo: 'Mensual', costo: 40.00 }
  ];
  
  //listaHorarios: Horario[] = [
  //];
  
  listaHorarios: Horario[] = [
    { dia: 'Lunes', horaA: '08:00', horaC: '17:00' },
    { dia: 'Martes', horaA: '08:00', horaC: '17:00' },
    { dia: 'Miércoles', horaA: '08:00', horaC: '17:00' },
    { dia: 'Jueves', horaA: '08:00', horaC: '17:00' },
    { dia: 'Viernes', horaA: '08:00', horaC: '17:00' },
    { dia: 'Sábado', horaA: '09:00', horaC: '13:00' },
    { dia: 'Domingo', horaA: 'Cerrado', horaC: 'Cerrado' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarAdmi();
      this.guardar()
      this.cargarHorario() 
    }
  }

  cargarAdmi(): Persona[] {
    if (isPlatformBrowser(this.platformId)) {
      const storedList = localStorage.getItem('listUser');
      if (!storedList || JSON.parse(storedList).length === 0) {
        const administradorPorDefecto = new Persona(
          'admin@example.com',
          'admin123',
          'Admin',
          'Principal',
          '123456789',
          '123 Calle Falsa',
          'ADM001',
          true
        );
        this.listaAdministradores = [administradorPorDefecto];
        localStorage.setItem('listUser', JSON.stringify(this.listaAdministradores));
      } else {
        this.listaAdministradores = JSON.parse(storedList);
      }
    }
    return this.listaAdministradores;
  }

  guardar() {
    const Espacios = localStorage.getItem('listEspacios');
    if (!Espacios || JSON.parse(Espacios).length === 0) {
      localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
    }
  
    const Horarios = localStorage.getItem('listHorarios');
    if (!Horarios || JSON.parse(Horarios).length === 0) {
      localStorage.setItem('listHorarios', JSON.stringify(this.listaHorarios));
    }
  
    const Tarifas = localStorage.getItem('listTarifas');
    if (!Tarifas || JSON.parse(Tarifas).length === 0) {
      localStorage.setItem('listTarifas', JSON.stringify(this.listaTarifa));
    }
  }
  
  
  nuevoAdmi(adminstrador: Persona) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaAdministradores.push(adminstrador);
      localStorage.setItem('listUser', JSON.stringify(this.listaAdministradores));
    }
  }

  eliminarAdmi(adminstrador: Persona) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.listaAdministradores.indexOf(adminstrador);
      if (index !== -1) {
        this.listaAdministradores.splice(index, 1);
        localStorage.setItem('listUser', JSON.stringify(this.listaAdministradores));
      }
    }
  }

  buscarAdminPorEmail(email: string): Persona | null {
    this.cargarAdmi()
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
    this.cargarEspacios() 
  }

  eliminarEspacio(espacio: any) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.listaEspacios.indexOf(espacio);
      if (index > -1) {
        this.listaEspacios.splice(index, 1);
        localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
      }
    }
    this.cargarEspacios() 
  }

  cargarEspacios() {
    if (isPlatformBrowser(this.platformId)) {
      this.listaEspacios = JSON.parse(localStorage.getItem('listEspacios') || '[]');
    }
    return this.listaEspacios;
  }

  actualizarEspacio(nombre: string, nuevoTotal: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaEspacios = this.cargarEspacios(); 
      const espacio = this.listaEspacios.find((e: any) => e.nombre === nombre);
  
      if (espacio) {
        espacio.total = nuevoTotal;
  
        if (nuevoTotal === 0) {
          espacio.estado = "O"; 
        } else if (nuevoTotal > 0) {
          espacio.estado = "D"; 
        }
  
        localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
      }
    }
  } 
  
  agregarContrato(contrato: Contrato, nombreE: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaContratos.push(contrato);
      localStorage.setItem('listContratos', JSON.stringify(this.listaContratos));

      /*if (!this.listaEspacios || this.listaEspacios.length === 0) {
        this.listaEspacios = JSON.parse(localStorage.getItem('listEspacios') || '[]');
      }

      const espacio = this.listaEspacios.find((espacio: any) => espacio.nombre === nombreE);
      if (espacio) {
        espacio.estado = 'O';
        localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
      }*/
    }
    this.cargarContratos()
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
          espacio.total = (espacio.total || 0) + 1;
          espacio.estado = 'D';
          localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
        }
        this.cargarContratos();
      }
    }
  }
  

  cargarContratos() {
    if (isPlatformBrowser(this.platformId)) {
      this.listaContratos = JSON.parse(localStorage.getItem('listContratos') || '[]');
    }
    return this.listaContratos;
  }

  agregarTarifa(tarifa: Tarifa) {
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

  actualizarTarifa(tiempo: string, nuevosDatos: Partial<Tarifa>): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.listaTarifa = this.cargarTarifa();  
      const tarifa = this.listaTarifa.find((t: any) => t.tiempo === tiempo);
  
      if (tarifa) {
        Object.assign(tarifa, nuevosDatos);
        localStorage.setItem('listTarifas', JSON.stringify(this.listaTarifa));
        return true; 
      }
    }
    return false; 
  }
  
  agrgarHorario(horario: Horario) {
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

  actualizarHorario(dia: string, nuevosDatos: Partial<Horario>): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.listaHorarios = this.cargarHorario();  
      const horario = this.listaHorarios.find((h: any) => h.dia === dia);
      if (horario) {
        Object.assign(horario, nuevosDatos);
        localStorage.setItem('listHorarios', JSON.stringify(this.listaHorarios));
        return true; 
      }
    }
    return false; 
  }
  

  cargarHorario() {
    if (isPlatformBrowser(this.platformId)) {
      this.listaHorarios = JSON.parse(localStorage.getItem('listHorarios') || '[]');
    }
    return this.listaHorarios;
  }
  

}