import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministradoresServiceService } from '../../services/administradores-service.service';

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
  espacios:any =[]
  constructor(private espacioS:AdministradoresServiceService){}
  ngOnInit(): void {
    this.cargarEs()
  }

  cargarEs(){
    this.espacios = this.espacioS.cargarEspacios()
  }

  agregarEspacio(){
    this.espacioS.agregarEspacio(this.nombre,this.tipo)
    this.cargarEs() 
    this.tipo=''
    this.nombre=''
  }

  eliminarEspacio(espacio:any){
    this.espacioS.eliminarEspacio(espacio)
    this.cargarEs()
  }
}
