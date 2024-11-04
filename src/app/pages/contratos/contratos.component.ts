import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { UsuariosServiceService } from '../../services/usuarios-service.service';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.scss'
})
export class ContratosComponent implements OnInit{

  espacios: any =[]
  espaciosF: any = []
  contratos: any = []
  clientes:any =  []
  tarifas:any = []

  cliente=''
  espacio='' 
  duracion=0
  tarifa=0

  constructor(private contratoS:AdministradoresServiceService,private clienteS:UsuariosServiceService){}
  ngOnInit(): void {
    this.cargarContratos()
    this.cargarEspacios()
    this.cargarClientes() 
    this.cargarTarifas() 
  }

  cargarClientes(){
    this.clientes = this.clienteS.cargarUsuario() 
  }
  cargarEspacios(){
    this.espacios = this.contratoS.cargarEspacios()
    this.filtrarEspacios() 
  }

  filtrarEspacios() {
    this.espaciosF = [];
    for (const espacio of this.espacios) {
      if (espacio.estado === 'D') {
        this.espaciosF.push(espacio); 
      }
    }
  }
  
  cargarContratos(){
    this.contratos =this.contratoS.cargarContratos()
  }

  cargarTarifas(){
    this.tarifas = this.contratoS.cargarTarifa()
  }
  agregarContrato(){
    this.contratoS.agregarContrato(this.cliente,this.espacio,this.duracion,this.tarifa)
    this.cargarContratos() 
  }

  eliminarContrato(contrato:any){
    this.contratoS.eliminarContrato(contrato)
    this.cargarContratos() 
  }
}
