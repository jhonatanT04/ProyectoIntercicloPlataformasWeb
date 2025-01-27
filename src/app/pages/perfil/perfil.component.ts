import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { CommonModule } from '@angular/common';
import { ActualizarPerfilComponent } from '../actualizar-perfil/actualizar-perfil.component';
import { FormsModule } from '@angular/forms';
import { Espacio } from '../../models/espacio';

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
  espacios: any = []
  ActualizarPerfil = false
  newTickt = false
  espacioSeleccionado: Espacio | null = null
  selectEspacio = false
  selectHoraIngreso = false
  horaIngreso = ''  
  placa= ''
  router = inject(Router)
  constructor(private correoS:AuthentificServiceService,private userS:UsuariosServiceService,private contratoS:AdministradoresServiceService,private espacioS: AdministradoresServiceService){}
  ngOnInit(): void {
    this.cargarCli() 
  }
  cargarCli(){
    this.espacios = this.espacioS.cargarEspacios()
    this.correo = this.correoS.getInfo()?.email || ''
    this.nombre = this.userS.buscarUsuarioPorEmail(this.correo)?.nombre || ''
    this.apellido = this.userS.buscarUsuarioPorEmail(this.correo)?.apellido || ''
    this.telefono =this.userS.buscarUsuarioPorEmail(this.correo)?.numeroTelefonico || ''
    this.contrato= this.contratoS.buscarContratoPorEmail(this.correo)?.espacio.nombreEspacio || ''
    this.contratos=this.contratoS.buscarListaContratosPorEmail(this.correo)
    
  }

  abrirActualizarPerfil(): void {
    this.ActualizarPerfil = true;
  }
  abrirNewTicket(): void {
    this.newTickt = !this.newTickt;
    if (!this.newTickt) {
      this.selectEspacio = false
      this.espacioSeleccionado = null
      this.selectHoraIngreso = false
      this.horaIngreso = ''  
    }
  }
  actualizar(ActualizarPerfil:boolean): void {
    ActualizarPerfil = false;
    this.ActualizarPerfil = false
    this.cargarCli()
  }

  cerrarSeccion() {
    this.correoS.logout().then(() =>
      this.router.navigate(['pages/login'])
    ).catch(error => console.log(error))
  }
  selecionarEspacio(espacio:Espacio) {
    console.log(espacio)
    this.espacioSeleccionado = espacio
    this.selectEspacio = true
  }  
  selectHoraTicket(){
    this.selectHoraIngreso = !this.selectHoraIngreso
  }
  validarHoraIngreso(){   
    if(this.horaIngreso === ''){
      return false
    }
    return true
  }
  crearTicket(){
    if(this.espacioSeleccionado !== null && this.horaIngreso !== ''){
      this.espacioSeleccionado.estado = 'O'
      //this.espacioSeleccionado.horaIngreso = this.horaIngreso
      this.espacioS.actualizarEspacio(this.espacios)
      this.abrirNewTicket()
    }
  } 
}