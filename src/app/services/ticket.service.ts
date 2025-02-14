import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { EspacioService } from './espacio.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private espacioService: EspacioService) { }

  private apiUrl = 'http://localhost:8080/practica/rs/tickets';

  // Obtener todos los tickets
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicketsporPersona(id: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/getTicketIDpersona/${id}`);
  }

  // Obtener un ticket por ID
  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo ticket
  createTicket(ticket: Ticket): Observable<Ticket> {
    // ticket.espacio.estado = 'R'
    // this.espacioService.updateEspacio(ticket.espacio).subscribe({
    // });
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  // Actualizar un ticket existente
  updateTicket(ticket: Ticket): Observable<void> {
    return this.http.put<void>(this.apiUrl, ticket);
  }

  // Eliminar un ticket por ID
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
