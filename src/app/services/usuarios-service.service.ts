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
    if (isPlatformBrowser(this.platformId)) {
      // Este bloque se ejecuta solo en el navegador.
    }
  }

  listaUsuarios: Persona[] = [];

  // Carga la lista de usuarios desde el almacenamiento local.
  cargarUsuario(): Persona[] {
    if (isPlatformBrowser(this.platformId)) {
      const storedList = localStorage.getItem('listUser');
      if (!storedList) {
        this.listaUsuarios = [];
        localStorage.setItem('listUser', JSON.stringify([]));
      } else {
        this.listaUsuarios = JSON.parse(storedList);
      }
    }
    return this.listaUsuarios;
  }

  // Agrega un nuevo usuario a la lista y lo guarda en el almacenamiento local.
  nuevoUsuario(usuario: Persona) {
    if (isPlatformBrowser(this.platformId)) {
      this.listaUsuarios = this.cargarUsuario();
      usuario.password = '';
      this.listaUsuarios.push(usuario);
      localStorage.setItem('listUser', JSON.stringify(this.listaUsuarios));
    }
  }

  // Elimina un usuario específico de la lista y actualiza el almacenamiento local.
  eliminarUsuario(usuario: Persona) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.listaUsuarios.indexOf(usuario);
      if (index !== -1) {
        this.listaUsuarios.splice(index, 1);
        localStorage.setItem('listUser', JSON.stringify(this.listaUsuarios));
      }
    }
  }

  // Busca un usuario específico en la lista por su referencia.
  seleccionarUsuraio(usuario: any) {
    return this.listaUsuarios.find(usuario => usuario.email === usuario.email);
  }

  // Busca un usuario en la lista por su email y lo devuelve si existe.
  buscarUsuarioPorEmail(email: string): Persona | null {
    if (isPlatformBrowser(this.platformId)) {
      this.listaUsuarios = this.cargarUsuario();
      const usuario = this.listaUsuarios.find(usuario => usuario.email === email);
      return usuario ? usuario : null;
    }
    return null;
  }

  // Actualiza los datos de un usuario identificado por su email.
  actualizarUsuario(email: string, nuevosDatos: Partial<Persona>): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.listaUsuarios = this.cargarUsuario();
      const index = this.listaUsuarios.findIndex(usuario => usuario.email === email);
      if (index !== -1) {
        this.listaUsuarios[index] = { ...this.listaUsuarios[index], ...nuevosDatos };
        localStorage.setItem('listUser', JSON.stringify(this.listaUsuarios));
        return true;
      }
    }
    return false;
  }

  // Actualiza el rol administrativo de un usuario identificado por su email.
  actualizarUsuarioRol(email: string, nuevoRol: boolean): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.listaUsuarios = this.cargarUsuario();
      const index = this.listaUsuarios.findIndex(usuario => usuario.email === email);
      if (index !== -1) {
        this.listaUsuarios[index].rol = nuevoRol;
        localStorage.setItem('listUser', JSON.stringify(this.listaUsuarios));
        return true;
      }
    }
    return false;
  }

  private apiUrl = 'http://localhost:8080/demo65/rs/personas'; // URL base del backend para personas
  
  createPersona(persona: Persona): Observable<Persona> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Persona>(this.apiUrl, persona, { headers });
  }
  updatePersona(persona: Persona): Observable<void> {
    return this.http.put<void>(this.apiUrl, persona);
  }

  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}`);
  }

  getPersonaByEmail(email: string): Observable<Persona> {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      console.error("Error: No hay token disponible.");
      return throwError(() => new Error("No hay token de autenticación"));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<Persona>(`${this.apiUrl}/getPersona/${email}`, { headers }).pipe(
      catchError(error => {
        console.error("Error al obtener persona:", error);
        return throwError(() => error);
      })
    );
  }
  

  deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
