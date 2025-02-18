import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrato } from '../models/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private apiUrl = 'http://localhost:8080/practica/rs/contratos';

  constructor(private http: HttpClient) { }

  createContrato(contrato: Contrato): Observable<Contrato> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Contrato>(this.apiUrl, contrato, { headers });
  }

  updateContrato(contrato: Contrato): Observable<Contrato> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Contrato>(`${this.apiUrl}`, contrato, { headers });
  }

  getContratos(): Observable<Contrato[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Contrato[]>(this.apiUrl, { headers });
  }

  getContratoById(id: number): Observable<Contrato> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Contrato>(`${this.apiUrl}/${id}`, { headers });
  }

  actualizarEstadoEspacio(id: number): Observable<Contrato> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Contrato>(`${this.apiUrl}/reserva/${id}`, { headers });
  }

  actualizarEstadoEspacioalEliminar(id: number): Observable<Contrato> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Contrato>(`${this.apiUrl}/reservaeliminar/${id}`, { headers });
  }

  getContratoByIdPersona(id: number): Observable<Contrato[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Contrato[]>(`${this.apiUrl}/contrato/${id}`, { headers });
  }

  deleteContrato(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/deletePersona/${id}`, { headers });
  }
}
