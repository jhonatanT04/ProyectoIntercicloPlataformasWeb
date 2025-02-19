import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private apiUrl = 'http://localhost:8080/demo65/rs/horarios';
  private apiUrl1 = 'http://localhost:8080/demo65/rs/notificaciones';

  constructor(private http: HttpClient) { }

  iniciarNotificaciones(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl1}/iniciar`, { headers });
  }

  getHorarios(): Observable<Horario[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Horario[]>(`${this.apiUrl}`, { headers });
  }

  getHorarioById(id: number): Observable<Horario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Horario>(`${this.apiUrl}/${id}`, { headers });
  }

  createHorario(horario: Horario): Observable<Horario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Horario>(this.apiUrl, horario, { headers });
  }

  updateHorario(horario: Horario): Observable<Horario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Horario>(`${this.apiUrl}`, horario, { headers });
  }

  deleteHorario(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/deletePersona/${id}`, { headers });
  }

  getHorariosNormales(): Observable<Horario[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Horario[]>(`${this.apiUrl}/normales`, { headers });
  }

  getHorariosEspeciales(): Observable<Horario[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Horario[]>(`${this.apiUrl}/especiales`, { headers });
  }

  getHorarioDelDia(): Observable<Horario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Horario>(`${this.apiUrl}/hoy`, { headers });
  }

  createHorarioEspecial(horario: Horario): Observable<Horario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Horario>(`${this.apiUrl}/especial`, horario, { headers });
  }
}
