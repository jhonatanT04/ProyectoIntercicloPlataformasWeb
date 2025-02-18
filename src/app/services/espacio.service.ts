import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Espacio } from '../models/espacio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspacioService {

  private apiUrl = 'http://localhost:8080/practica/rs/espacios'; 

  constructor(private http: HttpClient) {}

  createEspacio(espacio: Espacio): Observable<Espacio> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Espacio>(this.apiUrl, espacio,{ headers });
  }

  updateEspacio(espacio: Espacio): Observable<Espacio> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Espacio>(`${this.apiUrl}`, espacio,{ headers });
  }

  getEspacioById(id: number): Observable<Espacio> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Espacio>(`${this.apiUrl}/${id}`,{ headers });
  }

  deleteEspacio(id: number): Observable<void> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers });
  }

  listEspacios(): Observable<Espacio[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Espacio[]>(this.apiUrl,{headers});
  }
}
