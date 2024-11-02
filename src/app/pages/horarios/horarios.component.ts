import { Component, OnInit } from '@angular/core';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.scss'
})
export class HorariosComponent implements OnInit{
  horarios:any = []
  dia=''
  horaApertura=''
  horaCierre=''
  constructor(private horarioS:AdministradoresServiceService){}
  ngOnInit(): void {
    this.cargarHorario()
  }

  definirHorario(){
    this.horarioS.agrgarHorario(this.dia,this.horaApertura,this.horaCierre)
    this.cargarHorario()
  }

  eliminarHorario(horario:any){
    this.horarioS.eliminarHorario(horario)
    this.cargarHorario() 
  }

  cargarHorario(){
    this.horarios = this.horarioS.cargarHorario()
  }
}
