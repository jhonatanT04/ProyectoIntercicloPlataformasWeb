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

  espacioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required])
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

  
  agregarEspacio() {
  const totalEspaciosActuales = this.espacios.length; // Espacios actuales en uso (ocupados + disponibles)

  if (totalEspaciosActuales >= this.espaciosTotales) {
    this.alertError('No se pueden agregar más espacios. Aumente los espacios totales primero.');
    return;
  }

  if (this.espacioForm.valid) {
    const nuevoEspacio = new Espacio(
      this.espacioForm.get('nombre')?.value || '',
      'D' 
    );
    this.espacioS.agregarEspacio(nuevoEspacio);
    this.cargarEs();
    this.espacioForm.reset();
    this.alertError('Se agregó correctamente');
  } else {
    this.espacioForm.markAllAsTouched();
  }
}

  menuVisibleIndex: number | null = null;

  toggleMenu(index: number) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  espacio() {
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
