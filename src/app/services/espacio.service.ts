import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Espacio } from '../models/espacio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspacioService {

  private apiUrl = 'http://localhost:8080/demo65/rs/espacios'; 

  constructor(private http: HttpClient) {}

  createEspacio(espacio: Espacio): Observable<Espacio> {
    return this.http.post<Espacio>(this.apiUrl, espacio);
  }

  updateEspacio(espacio: Espacio): Observable<Espacio> {
    return this.http.put<Espacio>(`${this.apiUrl}`, espacio);
  }

  getEspacioById(id: number): Observable<Espacio> {
    return this.http.get<Espacio>(`${this.apiUrl}/${id}`);
  }

  deleteEspacio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listEspacios(): Observable<Espacio[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Espacio[]>(this.apiUrl,{headers});
  }
}
