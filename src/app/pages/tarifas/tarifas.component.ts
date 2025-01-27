import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { Tarifa } from '../../models/tarifa';
import { TarifasService } from '../../services/tarifas.service';

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
  menuVisibleIndex: number | null = null;

  tarifaForm = new FormGroup({
    tiempo: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  tarifaFormA = new FormGroup({
    tiempo: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(private tarifaS: TarifasService) {}

  ngOnInit(): void {
    this.cargarTarifa();
  }

  agregarTarifa(): void {
    if (this.tarifaFormA.valid) {
      const tiempo = this.tarifaFormA.get('tiempo')?.value || '';
      const costo = parseFloat(this.tarifaFormA.get('costo')?.value || '0');
      const nuevaTarifa = new Tarifa(0, tiempo, costo); 

      this.tarifaS.createTarifa(nuevaTarifa).subscribe(
        () => {
          this.alertConfirm('Se agregó correctamente.');
          this.cargarTarifa();
          this.tarifaFormA.reset();
          this.tarifasAgregar = false;
        },
        (error) => this.alertError('Error al agregar la tarifa.')
      );
    } else {
      this.tarifaFormA.markAllAsTouched();
    }
  }

  actualizarTarifa(): void {
    if (this.tarifaForm.valid) {
      const tiempo = this.tarifaForm.get('tiempo')?.value || '';
      const costo = parseFloat(this.tarifaForm.get('costo')?.value || '0');
      const tarifaExistente = this.tarifas.find(t => t.tiempo === tiempo);
  
      if (tarifaExistente) {
        const id = tarifaExistente.id; 
        const tarifaActualizada = new Tarifa(id, tiempo, costo);
  
        this.tarifaS.updateTarifa(tarifaActualizada).subscribe(
          () => {
            this.alertConfirm('Tarifa actualizada correctamente.');
            this.cargarTarifa();
            this.tarifaForm.reset();
            this.tarifasActualizar = false;
          },
          (error) => this.alertError('Error al actualizar la tarifa.')
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

  tarifass(): void {
    this.tarifasActualizar = !this.tarifasActualizar;
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
