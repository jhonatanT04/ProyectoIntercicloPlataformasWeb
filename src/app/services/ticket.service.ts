import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { EspacioService } from './espacio.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private espacioService: EspacioService) { }

  private apiUrl = 'http://172.20.10.7:8080/demo65/rs/tickets';

  // Obtener todos los tickets
  getTickets(): Observable<Ticket[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Ticket[]>(this.apiUrl, { headers });
  }
  valorApagarTicket(placa: string): Observable<Ticket> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Ticket>(`${this.apiUrl}/valorApagaraTicket/${placa}`, { headers });
  }
  getTicketsporPersona(id: number): Observable<Ticket[]> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Ticket[]>(`${this.apiUrl}/getTicketIDpersona/${id}`, { headers });
  }

  // Obtener un ticket por ID
  getTicketById(id: number): Observable<Ticket> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear un nuevo ticket
  createTicket(ticket: Ticket): Observable<Ticket> {
   
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Ticket>(this.apiUrl, ticket, { headers });
  }

  // Actualizar un ticket existente
  updateTicket(ticket: Ticket): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(this.apiUrl, ticket, { headers });
  }

  // Eliminar un ticket por ID
  deleteTicket(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  validarPlaca(placa: string): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>(`${this.apiUrl}/validarPlaca/${placa}`, { headers });
  }
  


}
