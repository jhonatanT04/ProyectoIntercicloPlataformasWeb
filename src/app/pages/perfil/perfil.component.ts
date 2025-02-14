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
import { HorariosService } from '../../services/horarios.service';
import { Horario } from '../../models/horario';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { Persona } from '../../models/persona';

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
  listTicktes:Ticket[] = [] 
  espacios: Espacio[] = []
  ActualizarPerfil = false
  newTickt = false
  
  espacioSeleccionado: Espacio | null = null
  horarioDia: Horario | null = null
  horaActual: string = '';
  user:any = null
  
  selectEspacio = false
  selectHoraIngreso = false
  placa= ''
  usuarioId: number = 0;
  router = inject(Router)
  constructor(private correoS:AuthentificServiceService,private userS:UsuariosServiceService,private contratoS:ContratoService,private espacioS: EspacioService,private JWTservice:JWTService,private horariosService:HorariosService,private ticketService:TicketService){}
  ngOnInit(): void {
    this.obtenerUsuarioId() 
    this.cargarCli()
    
  }
  
  
  obtenerUsuarioId() {
    
    this.userS.getPerfil().subscribe({
      next: (persona) => {
        if (persona) {
          this.usuarioId = persona.id;
          this.cargarCli();
        }
      },
      error: () => this.alertError('Error al obtener el ID del usuario'),
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
            this.user = persona;
            this.correo = persona.email
            this.cargarTickets()
          }
        },
        error: () => this.alertError('Error al cargar los datos del usuario'),
      });


      this.contratoS.getContratoByIdPersona(this.usuarioId).subscribe({
        next: (contratos) => {
          this.contratos = contratos;
        },
        error: () => this.alertError('Error al cargar los contratos'),
      });
    }
  } 

  cargarTickets(){
    this.ticketService.getTicketsporPersona(this.user.id).subscribe({
      next:(a)=>{
        console.log()
        this.listTicktes = a;
      }
    })
  }


  abrirActualizarPerfil(): void {
    this.ActualizarPerfil = true;
  }
  abrirNewTicket(): void {
    this.espacioS.listEspacios().subscribe({
      next: (a)=>{
        this.espacios = a
      }
    })
    this.horariosService.getHorarioDelDia().subscribe({
      next:(horario)=> this.horarioDia =  horario
    })
    this.newTickt = !this.newTickt;
    if (!this.newTickt) {
      this.selectEspacio = false
      this.espacioSeleccionado = null
      this.selectHoraIngreso = false
  
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
    this.espacioSeleccionado = espacio
    this.selectEspacio = true
  }  
  selectHoraTicket(){
    this.selectHoraIngreso = !this.selectHoraIngreso
  }
  validarHoraIngreso():boolean{
    if(this.horarioDia && (this.horaActual > this.horarioDia.horaCierre)) {
      return true
    }else if(this.horarioDia &&(this.horaActual < this.horarioDia.horaApertura)){
      return true
    }else{
      return false
    }
  }
  crearTicket() {
    if (this.espacioSeleccionado !== null ) {
      console.log(this.espacioSeleccionado)
      const ticket = new Ticket(0,this.placa,'','',0,this.espacioSeleccionado,this.user)
      this.ticketService.createTicket(ticket).subscribe(
        ()=>{
          this.abrirNewTicket();
          this.cargarCli(); 
          this.alertConfirm("Se creo el ticket")
        },error => {
              
          this.alertError(error.error.mensaje)
        }
      )
    
    }
  }
/* 
this.ticketService.createTicket(ticket).subscribe(
        {
        next: () => {
          this.abrirNewTicket();
          this.cargarCli(); 
          this.alertConfirm("Se creo el ticket")
        },
        error: (a) => this.alertError('Error al actualizar el espacio'),
      }*/
  verificarPlaca():boolean {
    const regex = /^[a-zA-Z]{3}-\d{4}$/; 
    if (regex.test(this.placa)) {
      return true
    } else {
      return false
    }
  }

  

  obtenerHoraActual() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0'); 
    const minutos = ahora.getMinutes().toString().padStart(2, '0'); 
    this.horaActual = `${horas}:${minutos}`;
  }


  showDangerAlert = false;
  textError = ''
  alertError(error: string) {
    this.showDangerAlert = true;
    this.textError = error
    setTimeout(() => {
      this.textError = ''
      this.showDangerAlert = false;
    },5000);
  }


  textConfirm = ''
  showConfirmAlert = false
  alertConfirm(error: string) {
    this.showConfirmAlert = true;
    this.textConfirm = error
    setTimeout(() => {
      this.textConfirm = ''
      this.showConfirmAlert = false;
    },5000);
  }

}