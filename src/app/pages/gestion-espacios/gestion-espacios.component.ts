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
  espaciosMostrarActualizar = false
  espaciosMostrarAgregar = false

  espacioSeleccionado: any = null;

  espacioForm = new FormGroup({
    total: new FormControl('', [Validators.required])
  });

  espacioFormA = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    total: new FormControl('', [Validators.required])
  });
  constructor(private espacioS: AdministradoresServiceService) { }
  ngOnInit(): void {
    this.cargarEspaciosTotales(); 
    if (this.espaciosTotales === 0) {
      this.espaciosTotales = 50;
      this.guardarEspaciosTotales(); 
    }
    this.cargarEs();
  }
  cargarEs() {
    this.espacios = this.espacioS.cargarEspacios()
    this.calcularEspaciosDisponibles()
    this.cargarEspaciosTotales()
  }

  calcularEspaciosDisponibles() {
    this.espaciosDisponibles = this.espacios.reduce((suma: number, espacio: any) => suma + (espacio.total || 0), 0);
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
    this.espaciosMostrarActualizar = true; // Mostrar el formulario
    this.espacioss()
  }


  editarEspacio(espacio: any) {
    this.seleccionarEspacio(espacio);
    this.espacioss(); // Cambiar la visibilidad del formulario
  }

  actualizarEspacio() {
    const sumaTotalEspacios = this.espacios
      .filter((espacio: any) => espacio.nombre !== this.espacioSeleccionado?.nombre)
      .reduce((total: number, espacio: any) => total + espacio.total, 0);


    const nuevoTotal = parseInt(this.espacioForm.get('total')?.value || '') || 0;

    if (sumaTotalEspacios + nuevoTotal > this.espaciosTotales) {
      this.alertError('No se pueden agregar más espacios porque exceden el límite total permitido.');
      return;
    }
    if (this.espacioForm.valid && this.espacioSeleccionado) {
      if (isNaN(nuevoTotal) || nuevoTotal < 0) {
        this.alertError('El total debe ser un número válido y mayor o igual a 0.');
        return;
      }

      this.espacioS.actualizarEspacio(this.espacioSeleccionado.nombre, nuevoTotal);
      this.cargarEs();
      this.espaciosMostrarActualizar = false;
      this.espacioForm.reset();
      this.alertConfirm('El total del espacio se actualizó correctamente.');
    } else {
      this.espacioForm.markAllAsTouched();
      this.alertError('Por favor, complete el formulario correctamente.');
    }
  }

  agregarEspacio() {
    const sumaTotalEspacios = this.espacios.reduce((total: number, espacio: any) => total + (espacio.total || 0), 0);
    const nuevoTotal = parseInt(this.espacioFormA.get('total')?.value || '', 10) || 0;
  
    if (sumaTotalEspacios + nuevoTotal > this.espaciosTotales) {
      this.alertError('No se pueden agregar más espacios porque exceden el límite total permitido.');
      return;
    }
  
    if (this.espacioFormA.valid) {
      const nombre = this.espacioFormA.get('nombre')?.value || '';
      const total = parseInt(this.espacioFormA.get('total')?.value || '', 10) || 0;
  
      const nuevoE = new Espacio(nombre, 'D', total);
      this.espacioS.agregarEspacio(nuevoE);
  
      this.cargarEs();
      this.espaciosMostrarActualizar = false;
      this.espacioFormA.reset();
      this.alertConfirm('El espacio se agregó correctamente.');
    } else {
      this.espacioFormA.markAllAsTouched();
      this.alertError('Por favor, complete el formulario correctamente.');
    }
  }
  


  menuVisibleIndex: number | null = null;

  toggleMenu(index: number) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  espacioss() {
    this.espaciosMostrarActualizar = !this.espaciosMostrarActualizar
  }

  mostrarA(){
    this.espaciosMostrarAgregar =!this.espaciosMostrarAgregar
  }
  eliminarEspacio(espacio: any) {
      const listaContratos = this.espacioS.cargarContratos();
      const espacioAsociado = listaContratos.some((contrato: any) => contrato.nombreE === espacio.nombre);
  
      if (espacioAsociado) {
        this.alertError('No se puede eliminar el espacio porque está asociado a un contrato.');
      } else {
        this.espacioS.eliminarEspacio(espacio);
        this.cargarEs();
      }
    
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
