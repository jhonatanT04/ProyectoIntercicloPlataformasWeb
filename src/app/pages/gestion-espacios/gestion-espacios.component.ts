import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { Espacio } from '../../models/espacio';

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

  tipo = ''
  nombre = ''
  estado = ''
  espacios: any = []
  espaciosMostrar = false

  espacioSeleccionado: any = null;

  espacioForm = new FormGroup({
    total: new FormControl('', [Validators.required])
  });
  constructor(private espacioS: AdministradoresServiceService) { }
  ngOnInit(): void {
    this.cargarEs()
  }

  cargarEs() {
    this.espacios = this.espacioS.cargarEspacios()
    this.calcularEspaciosDisponibles()
    this.cargarEspaciosTotales()
  }

  calcularEspaciosDisponibles() {
    this.espaciosDisponibles = this.espacios.filter((espacio: any) => espacio.estado === 'D').length;
  }


  guardarEspaciosTotales() {
    localStorage.setItem('espaciosTotales', this.espaciosTotales.toString());
  }

  cargarEspaciosTotales() {
    const guardados = localStorage.getItem('espaciosTotales');
    this.espaciosTotales = guardados ? parseInt(guardados, 10) : 0;
  }

  seleccionarEspacio(espacio: any) {
    this.espacioSeleccionado = espacio; // Guardar el espacio seleccionado
    this.espacioForm.patchValue({ total: espacio.total }); // Prellenar el formulario
    this.espaciosMostrar = true; // Mostrar el formulario
    this.espacioss() 
  }


  editarEspacio(espacio: any) {
    this.seleccionarEspacio(espacio);
    this.espacioss(); // Cambiar la visibilidad del formulario
  }
  
  agregarEspacio() {
    //const totalEspaciosActuales = this.espacios.reduce((total: number, espacio: any) => total + espacio.total, 0);
    //console.log(totalEspaciosActuales)
    const totalEspaciosActuales = this.espacios?.length || 0; 
    if (totalEspaciosActuales >= this.espaciosTotales) {
      this.alertError('No se pueden agregar más espacios. Aumente los espacios totales primero.');
      return;
    }
    if (this.espacioForm.valid && this.espacioSeleccionado) {
      const nuevoTotal = parseInt(this.espacioForm.get('total')?.value || '', 10) || 0;

      if (isNaN(nuevoTotal) || nuevoTotal < 0) {
        this.alertError('El total debe ser un número válido y mayor o igual a 0.');
        return;
      }
      this.espacioS.actualizarEspacio(this.espacioSeleccionado.nombre, nuevoTotal);
      this.cargarEs();
      this.espaciosMostrar = false;
      this.espacioForm.reset();
      this.alertError('El total del espacio se actualizó correctamente.');
    } else {
      this.espacioForm.markAllAsTouched();
      this.alertError('Por favor, complete el formulario correctamente.');
    }
  }


  menuVisibleIndex: number | null = null;

  toggleMenu(index: number) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  espacioss() {
    this.espaciosMostrar = !this.espaciosMostrar
  }
  eliminarEspacio(espacio: any) {
    this.espacioS.eliminarEspacio(espacio)
    this.cargarEs()
  }

  showDangerAlert = false;
  textError = ''
  alertError(error: string) {
    setTimeout(() => {
      this.textError = error
      this.showDangerAlert = true;
    }, 4);
    this.textError = ''
    this.showDangerAlert = false;
  }

  textAlert = ''
  showWarningAlert = false
  alertWarning(error: string) {
    setTimeout(() => {
      this.textAlert = error
      this.showWarningAlert = true;
    }, 4);
    this.textAlert = ''
    this.showWarningAlert = false;
  }
}
