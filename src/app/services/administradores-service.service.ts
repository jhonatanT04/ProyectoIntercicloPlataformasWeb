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

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
    }
  }

  private apiUrl = 'http://localhost:8080/practica/rs/registros';

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

  


}