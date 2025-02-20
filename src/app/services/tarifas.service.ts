import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarifa } from '../models/tarifa';

@Injectable({
  providedIn: 'root'
})
export class TarifasService {

<<<<<<< HEAD
  private apiUrl = 'http://172.20.10.7:8080/demo65/rs/tarifas';
=======
  private apiUrl = 'http://172.20.10.2:8080/demo65/rs/tarifas';
>>>>>>> 8b214b67fc51c453abc2dea2fde241f6bd3ef9b5

  constructor(private http: HttpClient) { }

  createTarifa(tarifa: Tarifa): Observable<Tarifa> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Tarifa>(this.apiUrl, tarifa, { headers });
  }

  updateTarifa(tarifa: Tarifa): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.apiUrl, tarifa, { headers });
  }

  getTarifaById(id: number): Observable<Tarifa> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Tarifa>(`${this.apiUrl}/${id}`, { headers });
  }

  deleteTarifa(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  listTarifas(): Observable<Tarifa[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Tarifa[]>(`${this.apiUrl}`, { headers });
  }
}
