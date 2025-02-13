import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private apiUrl = 'http://localhost:8080/practica/rs/horarios';
  private apiUrl1 = 'http://localhost:8080/practica/rs/notificaciones';

  constructor(private http: HttpClient) {}

  iniciarNotificaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl1}/iniciar`);
  }

  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}`);
  }

  getHorarioById(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${id}`);
  }

  createHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl,horario);
  }

  updateHorario(horario: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${this.apiUrl}`, horario);
  }

  deleteHorario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletePersona/${id}`);
  }

  getHorariosNormales(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/normales`);
  }

  getHorariosEspeciales(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/especiales`);
  }

  getHorarioDelDia(): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/hoy`);
  }

  createHorarioEspecial(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(`${this.apiUrl}/especial`, horario);
  }
}
