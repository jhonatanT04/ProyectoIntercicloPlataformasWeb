import { Component, OnInit } from '@angular/core';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../models/horario';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.scss'
})
export class HorariosComponent implements OnInit {
  horarios: any = []
  dia = ''
  horaApertura = ''
  horaCierre = ''

  horarioForm = new FormGroup({
    dia: new FormControl('', [Validators.required]),
    horaApertura: new FormControl('', [Validators.required]),
    horaCierre: new FormControl('', [Validators.required])
  });

  constructor(private horarioS: AdministradoresServiceService) { }
  ngOnInit(): void {
    this.cargarHorario()
  }

  definirHorario() {
    if (this.horarioForm.valid) {
      const horario = new Horario(this.dia,this.horaApertura,this.horaCierre);
      this.horarioS.agrgarHorario(new Horario(this.horarioForm.get('dia')?.value||' ',this.horarioForm.get('horaApertura')?.value||' ',this.horarioForm.get('horaCierre')?.value||' '));  
      this.cargarHorario();
    } else {
      this.horarioForm.markAllAsTouched();
    }
  }

  eliminarHorario(horario: any) {
    this.horarioS.eliminarHorario(horario)
    this.cargarHorario()
  }

  cargarHorario() {
    this.horarios = this.horarioS.cargarHorario()
  }
}
