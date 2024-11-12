import { Component, OnInit,EventEmitter, Output } from '@angular/core';
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
    this.nombre = this.userS.buscarUsuarioPorEmail(this.email)?.nombre || ''
    this.apellido = this.userS.buscarUsuarioPorEmail(this.email)?.apellido || ''
    this.direccion = this.userS.buscarUsuarioPorEmail(this.email)?.direccion || ''
    this.pais = this.userS.buscarUsuarioPorEmail(this.email)?.pais || ''
    this.ciudad = this.userS.buscarUsuarioPorEmail(this.email)?.ciudad || ''
    this.codigo = this.userS.buscarUsuarioPorEmail(this.email)?.codigo || ''
    this.contra = this.userS.buscarUsuarioPorEmail(this.email)?.password || ''
    this.numeroTelefonico = this.userS.buscarUsuarioPorEmail(this.email)?.numeroTelefonico || ''
  }
  constructor(private userS:UsuariosServiceService,private loginS:AuthentificServiceService,private contratoS:AdministradoresServiceService){}

  @Output() actualizado = new EventEmitter();
  email =''
  nombre=''
  apellido=''
  numeroTelefonico=''
  direccion=''
  contra=''
  pais=''
  ciudad=''
  codigo=''

  actualizar(){
    const nuevosDatos: Partial<Persona> = {
      nombre: this.nombre,
      apellido: this.apellido,
      numeroTelefonico: this.numeroTelefonico,
      direccion: this.direccion,
      pais:this.pais,
      ciudad:this.ciudad,
      codigo:this.codigo
    };
    const actualizado = this.userS.actualizarUsuario(this.email, nuevosDatos);
    this.contratoS.actualizarContratosCliente(this.email,nuevosDatos)
    this.nombre=''
    this.apellido=''
    this.numeroTelefonico=''
    this.direccion=''
    this.pais=''
    this.codigo=''
    this.ciudad=''
    this.actualizado.emit
  }
}
