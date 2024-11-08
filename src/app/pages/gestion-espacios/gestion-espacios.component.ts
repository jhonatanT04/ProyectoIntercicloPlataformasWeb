import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { Espacio } from '../../models/espacio';

@Component({
  selector: 'app-gestion-espacios',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './gestion-espacios.component.html',
  styleUrl: './gestion-espacios.component.scss'
})
export class GestionEspaciosComponent implements OnInit{

  tipo = ''
  nombre= ''
  estado= ''
  espacios:any =[]

  espacioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required])
  });
  constructor(private espacioS:AdministradoresServiceService){}
  ngOnInit(): void {
    this.cargarEs()
  }

  cargarEs(){
    this.espacios = this.espacioS.cargarEspacios()
  }

  agregarEspacio() {
    if (this.espacioForm.valid) {
      const nuevoEspacio = new Espacio(
        this.espacioForm.get('nombre')?.value || '',
        this.espacioForm.get('tipo')?.value || '',
        'D' 
      );
      this.espacioS.agregarEspacio(nuevoEspacio);
      this.cargarEs();
      this.espacioForm.reset(); 
    } else {
      this.espacioForm.markAllAsTouched();
    }
  }
  eliminarEspacio(espacio:any){
    this.espacioS.eliminarEspacio(espacio)
    this.cargarEs()
  }
}
