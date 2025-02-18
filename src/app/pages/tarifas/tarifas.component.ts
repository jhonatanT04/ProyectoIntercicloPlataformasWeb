import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { Tarifa } from '../../models/tarifa';
import { TarifasService } from '../../services/tarifas.service';
import { parse } from 'node:path';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.scss'
})
export class TarifasComponent implements OnInit{
  tarifas: Tarifa[] = [];
  tarifasAgregar = false;
  tarifasActualizar = false;
  tipoChar: string = '';
  menuVisibleIndex: number | null = null;
  tarifaActual: Tarifa | null = null;
  tarifaForm = new FormGroup({
    tiempo: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  tarifaFormA = new FormGroup({
    tiempo: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(private tarifaS: TarifasService) {}

  ngOnInit(): void {
    this.cargarTarifa();
  }

  agregarTarifa(): void {
    if (this.tarifaFormA.valid) {
      const tiempo = parseInt(this.tarifaFormA.get('tiempo')?.value || '0');
      const tipo = this.tarifaFormA.get('tipo')?.value || '';
      const costo = parseFloat(this.tarifaFormA.get('costo')?.value || '0');
      const nuevaTarifa = new Tarifa(0, tiempo,costo, ''); 
      if(tipo === 'Mensual'){
        nuevaTarifa.tipo = 'M'
      }else if(tipo === 'Dia'){
        nuevaTarifa.tipo = 'D'
      }else if(tipo === 'Hora'){
        nuevaTarifa.tipo = 'H'
      }else if(tipo === 'Minutos'){
        nuevaTarifa.tipo = 'm'
      }
      console.log(tipo);
      console.log(nuevaTarifa.tipo);
      this.tarifaS.createTarifa(nuevaTarifa).subscribe(
        () => {
          this.alertConfirm('Se agregó correctamente.');
          this.cargarTarifa();
          this.tarifaFormA.reset();
          this.tarifasAgregar = false;
        },
        (error) => this.alertError(error.error.mensaje)
      );
    } else {
      this.tarifaFormA.markAllAsTouched();
    }
  }

  actualizarTarifa(): void {
    if (this.tarifaForm.valid) {
      const tiempo = parseInt(this.tarifaForm.get('tiempo')?.value || '');
      const costo = parseFloat(this.tarifaForm.get('costo')?.value || '0');
      const tipo = this.tarifaForm.get('tipo')?.value || '';
      
      const tarifaActualizada = new Tarifa(this.tarifaActual?.id||0, tiempo, costo,'');
      if(tipo === 'Mensual'){
        tarifaActualizada.tipo = 'M';
      }else if(tipo === 'Diaria'){
        tarifaActualizada.tipo = 'D';
      }else if(tipo === 'Hora'){
        tarifaActualizada.tipo = 'H';
      }else if(tipo === 'Minuto'){
        tarifaActualizada.tipo = 'm';
      }
      if (this.tarifaActual) {
        this.tarifaS.updateTarifa(tarifaActualizada).subscribe(
          () => {
            this.alertConfirm('Tarifa actualizada correctamente.');
            this.cargarTarifa();
            this.tarifaForm.reset();
            this.tarifasActualizar = false;
          },
          (error) => this.alertError(error.error.mesaje)
        );
      } else {
        this.alertError('No se encontró la tarifa para actualizar.');
      }
    } else {
      this.tarifaForm.markAllAsTouched();
    }
  }
  

  eliminarTarifa(tarifa: Tarifa): void {
    if (tarifa.id !== undefined) {
      this.tarifaS.deleteTarifa(tarifa.id).subscribe(
        () => {
          this.alertConfirm('Tarifa eliminada correctamente.');
          this.cargarTarifa();
        },
        (error) => this.alertError('Error al eliminar la tarifa.')
      );
    }
  }

  cargarTarifa(): void {
    this.tarifaS.listTarifas().subscribe(
      (data) => (this.tarifas = data),
      (error) => this.alertError('Error al cargar las tarifas.')
    );
  }

  toggleMenu(index: number): void {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  tarifasA(): void {
    this.tarifasAgregar = !this.tarifasAgregar;
  }

  tarifass(tarifa:Tarifa|null): void {
    this.tarifasActualizar = !this.tarifasActualizar;
    if(this.tarifasActualizar){
      this.tarifaActual = tarifa;
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
