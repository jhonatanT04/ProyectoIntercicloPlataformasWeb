import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { Espacio } from '../../models/espacio';
import { EspacioService } from '../../services/espacio.service';

@Component({
  selector: 'app-gestion-espacios',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-espacios.component.html',
  styleUrl: './gestion-espacios.component.scss'
})
export class GestionEspaciosComponent implements OnInit {

  espaciosTotales: number = 0;
  espaciosDisponibles: number = 0;
  espacios: Espacio[] = [];
  espaciosMostrarActualizar = false;
  espaciosMostrarAgregar = false;
  espacioSeleccionado: Espacio | null = null;

  espacioForm = new FormGroup({
    estado: new FormControl('', [Validators.required])
  });

  espacioFormA = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });

  constructor(private espacioS: EspacioService) {}

  ngOnInit(): void {
    this.cargarEspaciosTotales();
    if (this.espaciosTotales === 0) {
      this.espaciosTotales = 50; // Set default total spaces
      this.guardarEspaciosTotales();
    }
    this.cargarEspacios();
  }

  cargarEspacios(): void {
    this.espacioS.listEspacios().subscribe(
      (data) => {
        this.espacios = data;
        this.calcularEspaciosDisponibles();
      },
      (error) => this.alertError('Error al cargar los espacios.')
    );
  }

  calcularEspaciosDisponibles(): void {
    this.espaciosDisponibles = this.espacios.filter((espacio) => espacio.estado === 'D').length;
  }

  guardarEspaciosTotales(): void {
    localStorage.setItem('espaciosTotales', this.espaciosTotales.toString());
  }

  cargarEspaciosTotales(): void {
    const guardados = localStorage.getItem('espaciosTotales');
    this.espaciosTotales = guardados ? parseInt(guardados, 10) : 0;
  }

  seleccionarEspacio(espacio: any) {
    this.espacioSeleccionado = espacio; 
    this.espacioForm.patchValue({ estado:   espacio.estado }); 
    this.espaciosMostrarActualizar = true; 
    this.espacioss()
  }

  actualizarEspacio(): void {
    if (this.espacioForm.valid && this.espacioSeleccionado) {
      const nuevoTotal = parseInt(this.espacioForm.get('total')?.value || '0', 10);
      const sumaTotalEspacios = this.espacios
        .filter((espacio) => espacio.id !== this.espacioSeleccionado?.id)
        .reduce((total, espacio) => total + espacio.id, 0); 

      if (sumaTotalEspacios + nuevoTotal > this.espaciosTotales) {
        this.alertError('No se pueden agregar más espacios porque exceden el límite total permitido.');
        return;
      }

      this.espacioSeleccionado.id = nuevoTotal;
      this.espacioS.updateEspacio(this.espacioSeleccionado.id, this.espacioSeleccionado).subscribe(
        () => {
          this.cargarEspacios();
          this.espaciosMostrarActualizar = false;
          this.espacioForm.reset();
          this.alertConfirm('El espacio se actualizó correctamente.');
        },
        (error) => this.alertError('Error al actualizar el espacio.')
      );
    } else {
      this.espacioForm.markAllAsTouched();
      this.alertError('Por favor, complete el formulario correctamente.');
    }
  }

  agregarEspacio(): void {
    const sumaTotalEspacios = this.espacios.reduce((total, espacio) => total + espacio.id, 0);
    const nuevoTotal = parseInt(this.espacioFormA.get('total')?.value || '0', 10);

    if (sumaTotalEspacios + nuevoTotal > this.espaciosTotales) {
      this.alertError('No se pueden agregar más espacios porque exceden el límite total permitido.');
      return;
    }

    if (this.espacioFormA.valid) {
      const nombre = this.espacioFormA.get('nombre')?.value || '';
      const nuevoEspacio = new Espacio (
        0, 
        nombre,
        'D'
      );

      this.espacioS.createEspacio(nuevoEspacio).subscribe(
        () => {
          this.cargarEspacios();
          this.espaciosMostrarAgregar = false;
          this.espacioFormA.reset();
          this.alertConfirm('El espacio se agregó correctamente.');
        },
        (error) => this.alertError('Error al agregar el espacio.')
      );
    } else {
      this.espacioFormA.markAllAsTouched();
      this.alertError('Por favor, complete el formulario correctamente.');
    }
  }

  eliminarEspacio(espacio: Espacio): void {
    this.espacioS.deleteEspacio(espacio.id).subscribe(
      () => {
        this.cargarEspacios();
        this.alertConfirm('Espacio eliminado correctamente.');
      },
      (error) => this.alertError('Error al eliminar el espacio.')
    );
  }

  menuVisibleIndex: number | null = null;
  toggleMenu(index: number): void {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  espacioss(): void {
    this.espaciosMostrarActualizar = !this.espaciosMostrarActualizar;
  }

  mostrarA(): void {
    this.espaciosMostrarAgregar = !this.espaciosMostrarAgregar;
  }

  showDangerAlert = false;
  textError = '';
  alertError(error: string): void {
    this.showDangerAlert = true;
    this.textError = error;
    setTimeout(() => {
      this.showDangerAlert = false;
      this.textError = '';
    }, 5000);
  }

  showConfirmAlert = false;
  textConfirm = '';
  alertConfirm(message: string): void {
    this.showConfirmAlert = true;
    this.textConfirm = message;
    setTimeout(() => {
      this.showConfirmAlert = false;
      this.textConfirm = '';
    }, 5000);
  }
}
