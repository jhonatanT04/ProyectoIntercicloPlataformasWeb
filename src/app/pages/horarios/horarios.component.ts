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
  horarioMostrarA = false

  horarioForm = new FormGroup({
    dia: new FormControl('', [Validators.required]),
    horaApertura: new FormControl('', [Validators.required]),
    horaCierre: new FormControl('', [Validators.required])
  });

  horarioFormA = new FormGroup({
    dia: new FormControl('', [Validators.required]),
    horaApertura: new FormControl('', [Validators.required]),
    horaCierre: new FormControl('', [Validators.required])
  });

  constructor(private horarioS: AdministradoresServiceService) { }
  ngOnInit(): void {
    this.cargarHorario()
  }

  actualizarHorario() {
    if (this.horarioForm.valid) {
      const dia = this.horarioForm.get('dia')?.value || '';
      const horaApertura = this.horarioForm.get('horaApertura')?.value || '';
      const horaCierre = this.horarioForm.get('horaCierre')?.value || '';
  
      //const horario = new Horario(dia, horaApertura, horaCierre);
  
      //this.horarioS.actualizarHorario(dia, horario);  
      //this.horarioS.agrgarHorario(horario)
      this.cargarHorario();
  
      this.horarioForm.reset();
      
      this.horarioMostrar = false;
      this.alertConfirm('Se actualizo correctamente') 
    } else {
      this.horarioForm.markAllAsTouched();
    }
  }

  agregarHorario() {
    if (this.horarioFormA.valid) {
      const dia = this.horarioFormA.get('dia')?.value || '';
      const horaApertura = this.horarioFormA.get('horaApertura')?.value || '';
      const horaCierre = this.horarioFormA.get('horaCierre')?.value || '';
  
      //const horario = new Horario(id: 1,dia, horaApertura, horaCierre);
  
      //this.horarioS.agrgarHorario(horario);   
      //this.horarioS.agrgarHorario(horario)
      this.cargarHorario();
  
      this.horarioFormA.reset();
      
      this.horarioMostrar = false;
      this.alertConfirm('Se agrego correctamente') 
    } else {
      this.horarioFormA.markAllAsTouched();
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

  horarioA(){
    this.horarioMostrarA = !this.horarioMostrarA
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

  showDangerAlert = false;
  textError = ''
  alertError(error: string) {
    this.showDangerAlert = true;
    this.textError = error
    setTimeout(() => {
      this.textError = ''
      this.showDangerAlert = false;
    }, 5000);
  }


  textConfirm = ''
  showConfirmAlert = false
  alertConfirm(error: string) {
    this.showConfirmAlert = true;
    this.textConfirm = error
    setTimeout(() => {
      this.textConfirm = ''
      this.showConfirmAlert = false;
    }, 5000);
  }
  
}
