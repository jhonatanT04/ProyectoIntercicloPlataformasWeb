import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; import { Persona } from '../models/persona';
import { isPlatformBrowser } from '@angular/common';
import { Espacio } from '../models/espacio';
import { Contrato } from '../models/contrato';
import { Tarifa } from '../models/tarifa';
import { Horario } from '../models/horario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresServiceService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
    }
  }

  private apiUrl = 'http://172.20.10.2:8080/demo65/rs/registros';

  registrarIngreso(registro: Registro): Observable<Registro> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Registro>(`${this.apiUrl}`, registro, { headers });
  }

  registrarSalida(registro: Registro): Observable<Registro> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Registro>(`${this.apiUrl}/salidaVehiculo`, registro, { headers });
  }

  obtenerHistorial(periodo: String): Observable<Registro[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Registro[]>(`${this.apiUrl}/historial?periodo=${periodo}`, { headers });
  }

  obtenerVehiculosEnParqueadero(): Observable<Registro[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Registro[]>(`${this.apiUrl}/parqueadero`, { headers });
  }
}