import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosServiceService } from '../../services/usuarios-service.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit{
  clientes:any = []
  nombre=''
  correo=''
  telefono=''

  ngOnInit(): void {
    this.cargarClientes() 
  }
  constructor(private clienteS:UsuariosServiceService){}

  cargarClientes(){
    this.clientes = this.clienteS.cargarUsuario() 
  }

  editarCliente(cliente:any){

  }

  guardarCliente(){

  }

  eliminarCliente(cliente:any){
    
  }
}
