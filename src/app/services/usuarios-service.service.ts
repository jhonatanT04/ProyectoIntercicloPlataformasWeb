import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  constructor() { }
  listaUsuarios: Persona[] = []
  cargarUsuario(): Persona[] {
    const storedList = localStorage.getItem('listUser');
    if (!storedList) {
      this.listaUsuarios = [];
      localStorage.setItem('listUser', JSON.stringify([]));
    } else {
      this.listaUsuarios = JSON.parse(storedList);
    }
    return this.listaUsuarios;
  }

  nuevoUsuario(usuario: Persona) {
    this.listaUsuarios = this.cargarUsuario()
    usuario.password = '';
    this.listaUsuarios.push(usuario);
    localStorage.setItem('listUser', JSON.stringify(this.listaUsuarios));
  }

  eliminarUsuario(usuario: Persona) {
    const index = this.listaUsuarios.indexOf(usuario);
    if (index !== -1) {
      this.listaUsuarios.splice(index, 1);
      localStorage.setItem('listUser', JSON.stringify(this.listaUsuarios));
    }
  }

  seleccionarUsuraio(usuario:any){
    return this.listaUsuarios.find(usuario=>usuario.email === usuario.email)
  }

  buscarUsuarioPorEmail(email: string): Persona | null {
    this.listaUsuarios = this.cargarUsuario();
    const usuario = this.listaUsuarios.find(usuario => usuario.email === email);
    return usuario ? usuario : null;
  }
}
