import { Component, OnInit } from '@angular/core';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../models/horario';
import { HorariosService } from '../../services/horarios.service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.scss'
})
export class HorariosComponent implements OnInit {
  horarios: any[] = [];
  dia = '';
  horaApertura = '';
  horaCierre = '';
  horarioMostrarA = false;
  horarioMostrar = false;

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

  constructor(private horarioS: HorariosService) {}

  ngOnInit(): void {
    this.cargarHorario();
  }

  actualizarHorario(): void {
    if (this.horarioForm.valid) {
      const horario: Horario = {
        id: this.horarios.find(h => h.dia === this.horarioForm.get('dia')?.value)?.id, 
        dia: this.horarioForm.get('dia')?.value || '',
        horaApertura: this.horarioForm.get('horaApertura')?.value || '',
        horaCierre: this.horarioForm.get('horaCierre')?.value || ''
      };
  
      if (horario.id !== undefined) {
        this.horarioS.updateHorario(horario.id, horario).subscribe(
          () => {
            this.alertConfirm('Se actualizó correctamente.');
            this.cargarHorario();
            this.horarioForm.reset();
            this.horarioMostrar = false;
          },
          (error) => this.alertError('Error actualizando el horario.')
        );
      } else {
        this.alertError('No se encontró el ID del horario a actualizar.');
      }
    } else {
      this.horarioForm.markAllAsTouched();
    }
  }
  


  agregarHorario(): void {
    if (this.horarioFormA.valid) {
      const dia = this.horarioFormA.get('dia')?.value || '';
      const horaApertura = this.horarioFormA.get('horaApertura')?.value || '';
      const horaCierre = this.horarioFormA.get('horaCierre')?.value || '';
  
      const horario = new Horario (
        0,
        dia,
        horaApertura,
        horaCierre
      );
  
      this.horarioS.createHorario(horario).subscribe(
        () => {
          this.alertConfirm('Se agregó correctamente.');
          this.cargarHorario();
          this.horarioFormA.reset();
          this.horarioMostrarA = false;
        },
        (error) => this.alertError('Error agregando el horario.')
      );
    } else {
      this.horarioFormA.markAllAsTouched();
    }
  }
  

  eliminarHorario(horario: Horario): void {
    if (horario.id) {
      this.horarioS.deleteHorario(horario.id).subscribe(
        () => {
          this.alertConfirm('Se eliminó correctamente.');
          this.cargarHorario();
        },
        (error) => this.alertError('Error eliminando el horario.')
      );
    }
  }

  cargarHorario(): void {
    this.horarioS.getHorarios().subscribe(
      (data) => (this.horarios = data),
      (error) => this.alertError('Error cargando los horarios.')
    );
  }

  horarioE(): void {
    this.horarioMostrar = !this.horarioMostrar;
  }

  horarioA(): void {
    this.horarioMostrarA = !this.horarioMostrarA;
  }

  menuVisibleIndex: number | null = null;
  toggleMenu(index: number): void {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  seleccionarHorario(horario: Horario): void {
    if (horario) {
      this.horarioForm.setValue({
        dia: horario.dia,
        horaApertura: horario.horaApertura,
        horaCierre: horario.horaCierre
      });
      this.horarioMostrar = true;
    }
  }

  showDangerAlert = false;
  textError = '';
  alertError(error: string): void {
    this.showDangerAlert = true;
    this.textError = error;
    setTimeout(() => {
      this.textError = '';
      this.showDangerAlert = false;
    }, 5000);
  }

  textConfirm = '';
  showConfirmAlert = false;
  alertConfirm(message: string): void {
    this.showConfirmAlert = true;
    this.textConfirm = message;
    setTimeout(() => {
      this.textConfirm = '';
      this.showConfirmAlert = false;
    }, 5000);
  }
}
