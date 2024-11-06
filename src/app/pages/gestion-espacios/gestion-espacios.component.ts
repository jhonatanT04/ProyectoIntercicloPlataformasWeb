import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { Espacio } from '../../models/espacio';

@Component({
  selector: 'app-gestion-espacios',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './gestion-espacios.component.html',
  styleUrl: './gestion-espacios.component.scss'
})
export class GestionEspaciosComponent implements OnInit{

  tipo = ''
  nombre= ''
  estado= ''
  espacios:any =[]
  constructor(private espacioS:AdministradoresServiceService){}
  ngOnInit(): void {
    this.cargarEs()
  }

  cargarEs(){
    this.espacios = this.espacioS.cargarEspacios()
  }

  agregarEspacio(){
    const espacio = new Espacio(this.nombre,this.tipo,'D');
    this.espacioS.agregarEspacio(espacio)
    this.cargarEs() 
    this.tipo=''
    this.nombre=''
  }

  eliminarEspacio(espacio:any){
    this.espacioS.eliminarEspacio(espacio)
    this.cargarEs()
  }
}
