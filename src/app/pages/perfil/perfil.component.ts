import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { CommonModule } from '@angular/common';
import { ActualizarPerfilComponent } from '../actualizar-perfil/actualizar-perfil.component';
import { FormsModule } from '@angular/forms';
import { Espacio } from '../../models/espacio';
import { ContratoService } from '../../services/contrato.service';
import { EspacioService } from '../../services/espacio.service';
import { JWTService } from '../../services/jwt.service';

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
  usuarioId: number = 0;
  router = inject(Router)
  constructor(private correoS:AuthentificServiceService,private userS:UsuariosServiceService,private contratoS:ContratoService,private espacioS: EspacioService,private JWTservice:JWTService){}
  ngOnInit(): void {
    this.obtenerUsuarioId() 
    this.cargarCli()
  }

  obtenerUsuarioId() {
    this.correo = this.correoS.getInfo()?.email || '';
    this.userS.getPersonaByEmail(this.correo).subscribe({
      next: (persona) => {
        if (persona) {
          this.usuarioId = persona.id;
          this.cargarCli();
        }
      },
      error: () => console.error('Error al obtener el ID del usuario'),
    });
  }

  cargarCli() {
    if (this.usuarioId > 0) {
      this.userS.getPersonaById(this.usuarioId).subscribe({
        next: (persona) => {
          if (persona) {
            this.nombre = persona.nombre;
            this.apellido = persona.apellido;
            this.telefono = persona.telefono;
          }
        },
        error: () => console.error('Error al cargar los datos del usuario'),
      });


      this.contratoS.getContratoByIdPersona(this.usuarioId).subscribe({
        next: (contratos) => {
          this.contratos = contratos;
        },
        error: () => console.error('Error al cargar los contratos'),
      });
    }
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
    this.JWTservice.deleteToken(),
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
  crearTicket() {
    if (this.espacioSeleccionado !== null && this.horaIngreso !== '') {
      this.espacioSeleccionado.estado = 'O';

      const nuevoE = new Espacio(this.espacioSeleccionado.id,this.espacioSeleccionado.nombreEspacio,'O');
      this.espacioS.updateEspacio(nuevoE).subscribe({
        next: () => {
          this.abrirNewTicket();
          this.cargarCli(); 
        },
        error: () => console.error('Error al actualizar el espacio'),
      });
    }
  }
}