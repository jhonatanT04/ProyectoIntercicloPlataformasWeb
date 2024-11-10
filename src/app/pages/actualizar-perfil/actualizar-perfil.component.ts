import { Component, OnInit } from '@angular/core';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { Persona } from '../../models/persona';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';

@Component({
  selector: 'app-actualizar-perfil',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './actualizar-perfil.component.html',
  styleUrl: './actualizar-perfil.component.scss'
})
export class ActualizarPerfilComponent implements OnInit{
  ngOnInit(): void {
    this.email = this.loginS.getUserEmail()
  }
  constructor(private userS:UsuariosServiceService,private loginS:AuthentificServiceService,private contratoS:AdministradoresServiceService){}

  email =''
  nombre=''
  apellido=''
  numeroTelefonico=''

  actualizar(){
    const nuevosDatos: Partial<Persona> = {
      nombre: this.nombre,
      apellido: this.apellido,
      numeroTelefonico: this.numeroTelefonico
    };
    const actualizado = this.userS.actualizarUsuario(this.email, nuevosDatos);
    this.contratoS.actualizarContratosCliente(this.email,nuevosDatos)
    this.nombre=''
    this.apellido=''
    this.numeroTelefonico=''
  }
}
