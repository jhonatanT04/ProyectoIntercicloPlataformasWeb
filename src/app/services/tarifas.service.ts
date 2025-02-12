import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarifa } from '../models/tarifa';

@Injectable({
  providedIn: 'root'
})
export class TarifasService {

  private apiUrl = 'http://localhost:8080/practica/rs/tarifas'; 

  constructor(private http: HttpClient) {}

  createTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(this.apiUrl, tarifa);
  }

  updateTarifa(tarifa: Tarifa): Observable<any> {
    return this.http.put<any>(this.apiUrl, tarifa);
  }

  getTarifaById(id: number): Observable<Tarifa> {
    return this.http.get<Tarifa>(`${this.apiUrl}/${id}`);
  }

  deleteTarifa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  listTarifas(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(`${this.apiUrl}`);
  }
}
