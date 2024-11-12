import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { CommonModule } from '@angular/common';
import { ActualizarPerfilComponent } from '../actualizar-perfil/actualizar-perfil.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule,CommonModule,ActualizarPerfilComponent,FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  nombre=''
  apellido=''
  correo:string =''
  telefono=''
  contrato=''
  contratos:any = []
  ActualizarPerfil = false
  constructor(private correoS:AuthentificServiceService,private userS:UsuariosServiceService,private contratoS:AdministradoresServiceService){}
  ngOnInit(): void {
    this.correo = this.correoS.getUserEmail()
    this.nombre = this.userS.buscarUsuarioPorEmail(this.correo)?.nombre || ''
    this.apellido = this.userS.buscarUsuarioPorEmail(this.correo)?.apellido || ''
    this.telefono =this.userS.buscarUsuarioPorEmail(this.correo)?.numeroTelefonico || ''
    this.contrato= this.contratoS.buscarContratoPorEmail(this.correo)?.nombreE || ''
    this.contratos=this.contratoS.buscarListaContratosPorEmail(this.correo)
  }

  abrirActualizarPerfil(): void {
    this.ActualizarPerfil = true;
  }

  actualizar(ActualizarPerfil:boolean): void {
    ActualizarPerfil = false;
    this.ActualizarPerfil = false
  }
}
