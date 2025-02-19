import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Persona } from '../models/persona';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
  }

  private apiUrl = 'http://localhost:8080/demo65/rs/personas'; 
  
  createPersona(persona: Persona): Observable<Persona> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Persona>(this.apiUrl, persona, { headers });
  }
  updatePersona(persona: Persona): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(this.apiUrl, persona, { headers });
  }
  
  getPersonaById(id: number): Observable<Persona> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Persona>(`${this.apiUrl}/${id}`, { headers });
  } 

  getPersonas(): Observable<Persona[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Persona[]>(`${this.apiUrl}`, { headers });
  }
  
  deletePersona(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
  getPerfil(): Observable<Persona> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Persona>(`${this.apiUrl}/getDatosPersonales`, { headers });
  } 
  updatePerfil(persona: Persona): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(`${this.apiUrl}/actualizarPerfil`, { headers });
  }
}
