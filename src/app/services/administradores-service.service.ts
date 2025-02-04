import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; import { Persona } from '../models/persona';
import { isPlatformBrowser } from '@angular/common';
import { Espacio } from '../models/espacio';
import { Contrato } from '../models/contrato';
import { Tarifa } from '../models/tarifa';
import { Horario } from '../models/horario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresServiceService {

  listaAdministradores: Persona[] = [];
  listaEspacios: Espacio[] = [
    { id:1,nombreEspacio: 'Espacio1', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio2', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio3', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio4', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio5', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio6', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio7', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio8', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio9', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio10', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio11', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio12', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio13', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio14', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio15', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio16', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio17', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio18', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio19', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio20', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio21', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio22', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio23', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio24', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio25', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio26', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio27', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio28', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio29', estado: 'D' },
    { id:1,nombreEspacio: 'Espacio30', estado: 'D' }
  ]
  

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
    /*{ id: 1,dia: 'Lunes', horaApertura: '08:00', horaCierre: '17:00' },
    { id: 1,dia: 'Martes', horaApertura: '08:00', horaCierre: '17:00' },
    { id: 1,dia: 'Miércoles', horaApertura: '08:00', horaCierre: '17:00' },
    { id: 1,dia: 'Jueves', horaApertura: '08:00', horaCierre: '17:00' },
    { id: 1,dia: 'Viernes', horaApertura: '08:00', horaCierre: '17:00' },
    { id: 1,dia: 'Sábado', horaApertura: '09:00', horaCierre: '13:00' },
    { id: 1,dia: 'Domingo', horaApertura: 'Cerrado', horaCierre: 'Cerrado' }*/
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient) {
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
          0,
          'admin@example.com',
          'admin123',
          'Admin',
          'Principal',
          '0923456789',
          '123 Calle Falsa',
          '0123456789',
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

  private apiUrl = 'http://localhost:8080/demo65/rs/registros';

  registrarIngreso(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(`${this.apiUrl}`, registro);
  }
  
  registrarSalida(registro: Registro): Observable<Registro> {
    return this.http.put<Registro>(`${this.apiUrl}`, registro);
  }
  
  obtenerHistorial(periodo: String): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.apiUrl}/historial?periodo=${periodo}`);
  }
  
  obtenerVehiculosEnParqueadero(): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.apiUrl}/parqueadero`);
  }

  // Guarda listas iniciales de espacios, horarios y tarifas en el almacenamiento local.
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

  // Agrega un nuevo administrador.
  nuevoAdmi(adminstrador: Persona) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaAdministradores.push(adminstrador);
      localStorage.setItem('listUser', JSON.stringify(this.listaAdministradores));
    }
  }

  // Elimina un administrador.
  eliminarAdmi(adminstrador: Persona) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.listaAdministradores.indexOf(adminstrador);
      if (index !== -1) {
        this.listaAdministradores.splice(index, 1);
        localStorage.setItem('listUser', JSON.stringify(this.listaAdministradores));
      }
    }
  }

  // Busca un administrador por su correo electrónico.
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

  // Agrega un espacio nuevo.
  agregarEspacio(espacio: Espacio) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaEspacios.push(espacio);
      localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
    }
    this.cargarEspacios()
  }

  // Elimina un espacio existente.
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

  // Actualiza el estado de un espacio
  actualizarEspacio(nombre: string) {
    if (isPlatformBrowser(this.platformId)) {
        this.listaEspacios = this.cargarEspacios();
        const espacio = this.listaEspacios.find((e: any) => e.nombre === nombre);

        if (espacio) {
            espacio.estado = espacio.estado === "O" ? "D" : "O";

            localStorage.setItem('listEspacios', JSON.stringify(this.listaEspacios));
        }
    }
}


  // Agrega un nuevo contrato a la lista
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

  // Elimina un contrato específico
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
        this.cargarContratos();
      }
    }
  }

  // Carga la lista de contratos desde el almacenamiento local
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


  buscarTarifaPorTiempo(tiempo: string): Tarifa | null {
    if (isPlatformBrowser(this.platformId)) {
      this.listaTarifa = this.cargarTarifa(); // Asegurarse de cargar las tarifas desde el almacenamiento
      const tarifaEncontrada = this.listaTarifa.find((t: any) => t.tiempo === tiempo);
      return tarifaEncontrada || null; // Retorna la tarifa encontrada o null si no existe
    }
    return null; // Si no está en el entorno del navegador, retorna null
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

  // Carga los horarios desde el almacenamiento local
  cargarHorario() {
    if (isPlatformBrowser(this.platformId)) {
      this.listaHorarios = JSON.parse(localStorage.getItem('listHorarios') || '[]');
    }
    return this.listaHorarios;
  }


}