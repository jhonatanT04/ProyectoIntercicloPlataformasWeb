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
    { nombre: 'Espacio 1', estado: 'D' },
    { nombre: 'Espacio 2', estado: 'D' },
    { nombre: 'Espacio 3', estado: 'D' },
    { nombre: 'Espacio 4', estado: 'D' },
    { nombre: 'Espacio 5', estado: 'D' },
    { nombre: 'Espacio 6', estado: 'D' },
    { nombre: 'Espacio 7', estado: 'D' },
    { nombre: 'Espacio 8', estado: 'D' },
    { nombre: 'Espacio 9', estado: 'D' },
    { nombre: 'Espacio 10', estado: 'D' },
    { nombre: 'Espacio 11', estado: 'D' },
    { nombre: 'Espacio 12', estado: 'D' },
    { nombre: 'Espacio 13', estado: 'D' },
    { nombre: 'Espacio 14', estado: 'D' },
    { nombre: 'Espacio 15', estado: 'D' },
    { nombre: 'Espacio 16', estado: 'D' },
    { nombre: 'Espacio 17', estado: 'D' },
    { nombre: 'Espacio 18', estado: 'D' },
    { nombre: 'Espacio 19', estado: 'D' },
    { nombre: 'Espacio 20', estado: 'D' },
    { nombre: 'Espacio 21', estado: 'D' },
    { nombre: 'Espacio 22', estado: 'D' },
    { nombre: 'Espacio 23', estado: 'D' },
    { nombre: 'Espacio 24', estado: 'D' },
    { nombre: 'Espacio 25', estado: 'D' },
    { nombre: 'Espacio 26', estado: 'D' },
    { nombre: 'Espacio 27', estado: 'D' },
    { nombre: 'Espacio 28', estado: 'D' },
    { nombre: 'Espacio 29', estado: 'D' },
    { nombre: 'Espacio 30', estado: 'D' },
    { nombre: 'Espacio 31', estado: 'D' },
    { nombre: 'Espacio 32', estado: 'D' },
    { nombre: 'Espacio 33', estado: 'D' },
    { nombre: 'Espacio 34', estado: 'D' },
    { nombre: 'Espacio 35', estado: 'D' },
    { nombre: 'Espacio 36', estado: 'D' },
    { nombre: 'Espacio 37', estado: 'D' },
    { nombre: 'Espacio 38', estado: 'D' },
    { nombre: 'Espacio 39', estado: 'D' },
    { nombre: 'Espacio 40', estado: 'D' },
    { nombre: 'Espacio 41', estado: 'D' },
    { nombre: 'Espacio 42', estado: 'D' },
    { nombre: 'Espacio 43', estado: 'D' },
    { nombre: 'Espacio 44', estado: 'D' },
    { nombre: 'Espacio 45', estado: 'D' },
    { nombre: 'Espacio 46', estado: 'D' },
    { nombre: 'Espacio 47', estado: 'D' },
    { nombre: 'Espacio 48', estado: 'D' },
    { nombre: 'Espacio 49', estado: 'D' },
    { nombre: 'Espacio 50', estado: 'D' }
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
      //this.guardar()
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
          'Ecuador',
          'Quito',
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
    localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
    localStorage.setItem('listHorarios', JSON.stringify(this.listaHorarios))
    localStorage.setItem('listTarifas', JSON.stringify(this.listaTarifa))
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

  agregarContrato(contrato: Contrato, nombreE: string) {
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
          espacio.estado = 'D';
          localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
        }
        this.cargarContratos() 
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