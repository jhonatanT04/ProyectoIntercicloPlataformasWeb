import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.scss'
})
export class ContratosComponent implements OnInit{

  espacios: any =[]
  contratos: any = []
  clientes:any =  []

  cliente=''
  espacio=''
  duracion=0

  constructor(private contratoS:AdministradoresServiceService){}
  ngOnInit(): void {
    this.cargarContratos()
    this.cargarEspacios()
  }

  cargarClientes(){
    
  }
  cargarEspacios(){
    this.espacios = this.contratoS.cargarEspacios()
  }

  cargarContratos(){
    this.contratos =this.contratoS.cargarContratos()
  }

  agregarContrato(){
    this.contratoS.agregarContrato(this.cliente,this.espacio,this.duracion,1)
    localStorage.setItem('listContratos',JSON.stringify(this.contratos))
    this.cargarContratos() 
  }

  eliminarContrato(contrato:any){

  }
}
