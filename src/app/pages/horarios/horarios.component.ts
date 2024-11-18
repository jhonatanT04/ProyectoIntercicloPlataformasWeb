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
      const dia = this.horarioForm.get('dia')?.value || '';
      const horaApertura = this.horarioForm.get('horaApertura')?.value || '';
      const horaCierre = this.horarioForm.get('horaCierre')?.value || '';
  
      const horario = new Horario(dia, horaApertura, horaCierre);
  
      this.horarioS.actualizarHorario(dia, horario);  
      //this.horarioS.agrgarHorario(horario)
      this.cargarHorario();
  
      this.horarioForm.reset();
      
      this.horarioMostrar = false;
    } else {
      this.horarioForm.markAllAsTouched();
    }
  }
  
  clienteseleccionado =false
  
  eliminarHorario(horario: any) {
    this.horarioS.eliminarHorario(horario)
    this.cargarHorario()
  }

  cargarHorario() {
    this.horarios = this.horarioS.cargarHorario()
  }

  horarioMostrar=false
  horarioE(){
    this.horarioMostrar = !this.horarioMostrar
  }

  menuVisibleIndex: number | null = null;
  
  toggleMenu(index: number) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  seleccionarHorario(dia: string, horaApertura: string, horaCierre: string) {
    this.horarioForm.setValue({
      dia: dia,
      horaApertura: horaApertura,
      horaCierre: horaCierre,
    });
    this.horarioMostrar = true; 
  }
  
}
